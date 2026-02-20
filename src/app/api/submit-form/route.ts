import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createLeadtrekkerInstance } from "@/lib/services/leadtrekker";
import { createEverlyticInstance } from "@/lib/services/everlytic";

export async function POST(request: NextRequest) {
	try {
		const { formId, data, recaptchaToken } = await request.json();

		const recaptchaResponse = await fetch(
		"https://www.google.com/recaptcha/api/siteverify",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				secret: process.env.RECAPTCHA_SECRET_KEY!,
				response: recaptchaToken,
			}),
		}
	);

	const recaptchaData = await recaptchaResponse.json();

	console.log("reCAPTCHA verify:", {
	success: recaptchaData.success,
	score: recaptchaData.score,
	action: recaptchaData.action,
	hostname: recaptchaData.hostname,
	challenge_ts: recaptchaData.challenge_ts,
	"error-codes": recaptchaData["error-codes"],
	});

	if (!recaptchaData.success) {
		console.error("reCAPTCHA verification failed:", recaptchaData);
		return NextResponse.json(
			{ success: false, error: "reCAPTCHA failed" },
			{ status: 403 }
		);
	}

		// Configure nodemailer transporter
		// You'll need to set these environment variables:
		// EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_TO
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: parseInt(process.env.EMAIL_PORT || "587"),
			secure: process.env.EMAIL_PORT === "465",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		// Format form data for email
		const formFields = Object.entries(data)
			.map(([key, value]) => `<strong>${key}:</strong> ${value}`)
			.join("<br>");

		// Send email
		await transporter.sendMail({
			from: process.env.EMAIL_FROM || "noreply@starbright.co.za",
			to: process.env.EMAIL_TO || process.env.EMAIL_USER,
			subject: `Form Submission - Form ID: ${formId}`,
			html: `
				<h2>New Form Submission</h2>
				<p><strong>Form ID:</strong> ${formId}</p>
				<p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
				<hr>
				<h3>Form Data:</h3>
				${formFields}
			`,
		});

		console.log('Updates', data.updates);
		
		//return NextResponse.json({ success: true }, { status: 200 });

		// Create Gravity Forms entry via REST API v2
		if (process.env.GF_ENDPOINT && 
		    process.env.GF_API_KEY && 
		    process.env.GF_API_SECRET) {
			
			try {
				// Map form field names to Gravity Forms field IDs
				const fieldMapping: Record<string, string> = {
					name: "1",
					surname: "3",
					email: "4",
					contactNumber: "5",
					companyName: "7",
					service: "8",
					how: "9",
					other: "10",
					message: "11"
				};

				// Convert form data to Gravity Forms format
				const gravityFieldsData: Record<string, any> = {};
				Object.entries(data).forEach(([key, value]) => {
					const fieldId = fieldMapping[key];
					if (fieldId) {
						gravityFieldsData[fieldId] = value;
					}
				});

				// Prepare entry data with form_id and field data
				const entryData = {
					form_id: typeof formId === 'string' ? parseInt(formId, 10) : formId,
					...gravityFieldsData,
					// Optional: Add additional metadata
					source_url: request.headers.get("referer") || "",
					ip: request.headers.get("x-forwarded-for") || 
					    request.headers.get("x-real-ip") || 
					    "127.0.0.1",
					user_agent: request.headers.get("user-agent") || "",
					date_created: new Date().toISOString(),
				};

				// Create Basic Auth header
				const auth = Buffer.from(
					`${process.env.GF_API_KEY}:${process.env.GF_API_SECRET}`
				).toString("base64");

				// Make POST request to Gravity Forms REST API
				const gravityResponse = await fetch(
					`${process.env.GF_ENDPOINT}/entries`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Basic ${auth}`,
						},
						body: JSON.stringify(entryData),
					}
				);

				if (!gravityResponse.ok) {
					const errorData = await gravityResponse.json();
					console.error("Gravity Forms API error:", errorData);
					// Continue execution even if Gravity Forms fails
				} else {
					const gravityData = await gravityResponse.json();
					console.log("Gravity Forms entry created:", gravityData.id);
				}
			} catch (gravityError) {
				console.error("Failed to create Gravity Forms entry:", gravityError);
				// Continue execution even if Gravity Forms fails
			}
		}

		// Submit to Leadtrekker (Form ID 2 - Contact Form)
		if (formId === 2) {
			const leadtrekker = createLeadtrekkerInstance();
			const everlytic = createEverlyticInstance();
			
			if (leadtrekker) {
				try {
					const mobile = data.contactNumber?.replace(/[\s\(\)\-]/g, '') || '';
					
					// Check if lead is not spam
					const isValidLead = await leadtrekker.checkLead(data.email, data.name || '');
					
					if (isValidLead) {
						// Prepare lead data
						const leadData = {
							name: data.name || '',
							email: data.email,
							number: mobile,
							company: data.companyName || '',
							sourceid: data.sourceid || null,
							custom_fields: {
								'Surname': data.surname || '',
								'Service': data.service || '',
								'How Did You Hear About Us': data.how || '',
								'Message': data.message || '',
								'IP': request.headers.get("x-forwarded-for") || 
								     request.headers.get("x-real-ip") || 
								     "127.0.0.1"
							} as Record<string, string>
						};

						// Add "Other" field if it has a value
						if (data.other && data.other.trim()) {
							leadData.custom_fields['Other'] = data.other;
						}

						// Add URL tracking parameters if available
						const urlParams = request.nextUrl.searchParams;
						const trackingParams: Record<string, string> = {};
						urlParams.forEach((value, key) => {
							trackingParams[key] = value;
						});
						
						const finalLeadData = leadtrekker.addParams(leadData, trackingParams);

						// Push to Leadtrekker
						const leadResult = await leadtrekker.pushLead(finalLeadData);

						console.log('Leadtrekker lead created:', leadResult);

						// Also push to Everlytic if configured and if user opted in for updates
						const fullName = `${data.name || ''} ${data.surname || ''}`.trim();
						if (data.updates) {
							if (everlytic) {
								try {
									const everlyticData = {
										name: fullName,
										email: data.email,
										mobile: mobile,
										on_duplicate: 'update',
										list_id: {
											'237396': 'subscribed',
											'209951': 'subscribed',
											'205234': 'subscribed',
											'205233': 'subscribed',
											'210461': 'subscribed',
											'211945': 'subscribed'
										}
									};

									const everlyticResult = await everlytic.pushLead(everlyticData);
									console.log('Everlytic contact created/updated:', everlyticResult);
								} catch (everlyticError) {
									console.error("Failed to submit to Everlytic:", everlyticError);
									// Continue execution even if Everlytic fails
								}
							} else {
								console.warn('Everlytic not configured, skipping contact creation');
							}
						}

					} else {
						console.log('Lead rejected - spam detected:', data.email, data.name);
					}
				} catch (leadtrekkerError) {
					console.error("Failed to submit to Leadtrekker:", leadtrekkerError);
					// Continue execution even if Leadtrekker fails
				}
			}
		}

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error("Error submitting form:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to submit form" },
			{ status: 500 }
		);
	}
}
