import { NextRequest, NextResponse } from "next/server";
import { createLeadtrekkerInstance } from "@/lib/services/leadtrekker";

export async function POST(request: NextRequest) {
	try {
		let formId: number;
		let data: Record<string, any> = {};
		const uploadedFiles: Map<string, File> = new Map(); // fieldKey -> File object

		// Check if request is multipart/form-data or JSON
		const contentType = request.headers.get("content-type") || "";
		
		if (contentType.includes("multipart/form-data")) {
			// Handle FormData (with files)
			const formData = await request.formData();
			
			formId = parseInt(formData.get('formId') as string, 10);

			// Verify reCAPTCHA token
			const recaptchaToken = formData.get('recaptchaToken') as string | null;
			if (!recaptchaToken || !process.env.RECAPTCHA_SECRET_KEY) {
				return NextResponse.json(
					{ success: false, error: "reCAPTCHA token missing" },
					{ status: 400 }
				);
			}

			const recaptchaResponse = await fetch(
				"https://www.google.com/recaptcha/api/siteverify",
				{
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: new URLSearchParams({
						secret: process.env.RECAPTCHA_SECRET_KEY,
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
				"error-codes": recaptchaData["error-codes"],
			});

			if (!recaptchaData.success || recaptchaData.score < 0.5) {
				console.error("reCAPTCHA verification failed:", recaptchaData);
				return NextResponse.json(
					{ success: false, error: "reCAPTCHA verification failed" },
					{ status: 403 }
				);
			}

			// Process all form fields
			for (const [key, value] of formData.entries()) {
				if (key === 'formId' || key === 'recaptchaToken') continue; // Skip formId and token as we already extracted them
				
				if (value instanceof File) {
					// Store file object for later upload to Leadtrekker
					if (value.size > 0) {
						uploadedFiles.set(key, value);
						data[key] = value.name; // Store filename for reference
						console.log(`File detected: ${key} -> ${value.name}`);
					} else {
						data[key] = {}; // Empty file
					}
				} else {
					data[key] = value;
				}
			}
		} else {
			// Handle JSON (backward compatibility)
			const body = await request.json();
			formId = body.formId;
			data = body.data || {};
		}

		// Create Gravity Forms entry via REST API v2
		if (process.env.GF_ENDPOINT && 
		    process.env.GF_API_KEY && 
		    process.env.GF_API_SECRET) {
			
			try {
				// Parse input_X field names to extract field IDs
				const gravityFieldsData: Record<string, any> = {};
				Object.entries(data).forEach(([key, value]) => {
					// Parse field names like "input_1", "input_3", etc.
					const match = key.match(/^input_(\d+)$/);
					if (match) {
						const fieldId = match[1];
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

		// Submit to Leadtrekker - Form ID 1 (Career/Job Application Form)
		if (formId === 1) {
			const leadtrekker = createLeadtrekkerInstance();
			
			if (leadtrekker) {
				try {
					// Map field IDs to data for Form 1
					const name = data.input_1 || '';
					const phone = data.input_4 || '';
					const email = data.input_5 || '';
					const interestedIn = data.input_8 || '';
					const cvFile = data.input_9 || '';
					const message = data.input_10 || '';
					const optInUpdates = data.input_12 || '';
					
					const mobile = phone?.toString().replace(/[\s\(\)\-]/g, '') || '';
					
					// Check if lead is not spam
					const isValidLead = await leadtrekker.checkLead(email?.toString() || '', name?.toString() || '');
					
					if (isValidLead) {
						// Prepare lead data
						const leadData = {
							name: name?.toString() || '',
							email: email?.toString() || '',
							number: mobile,
							company: '',
							sourceid: data.sourceid || null,
							custom_fields: {
								'Tell us what you\'re interested in': interestedIn?.toString() || '',
								'Message': message?.toString() || '',
								'Opt-in for updates': optInUpdates?.toString() || '',
								'IP': request.headers.get("x-forwarded-for") || 
								     request.headers.get("x-real-ip") || 
								     "127.0.0.1"
							} as Record<string, string>
						};

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

						// Upload CV file if present and we have a lead ID
						const leadId = leadResult?.leadid || leadResult?.id;
						
						if (leadId && uploadedFiles.has('input_9')) {
							try {
								const cvFileObj = uploadedFiles.get('input_9')!;
								
								console.log('Preparing to upload file:', {
									fileName: cvFileObj.name,
									fileSize: cvFileObj.size,
									fileType: cvFileObj.type,
									leadId: leadId
								});
								
								// Create FormData with leadid and file
								const fileFormData = new FormData();
								fileFormData.append('leadid', Buffer.from(leadId.toString()).toString('base64'));
								
								// Convert File to Blob with proper type
								const fileBuffer = await cvFileObj.arrayBuffer();
								const blob = new Blob([fileBuffer], { type: cvFileObj.type });
								fileFormData.append('file', blob, cvFileObj.name);
								
								// Upload directly to Leadtrekker
								const fileResult = await leadtrekker.pushLeadFile(fileFormData);
								console.log('CV file uploaded to Leadtrekker:', fileResult);
							} catch (fileError) {
								console.error('Failed to upload CV file:', fileError);
								if (fileError instanceof Error) {
									console.error('Error details:', fileError.message);
								}
								// Continue even if file upload fails
							}
						} else if (!uploadedFiles.has('input_9')) {
							console.log('No CV file was uploaded');
						} else {
							console.log('Lead ID not found in response:', leadResult);
						}
					} else {
						console.log('Lead rejected - spam detected:', email, name);
					}
				} catch (leadtrekkerError) {
					console.error("Failed to submit to Leadtrekker:", leadtrekkerError);
					// Continue execution even if Leadtrekker fails
				}
			}
		}

		// Submit to Leadtrekker - Form ID 2 (Contact Form)
		if (formId === 2) {
			const leadtrekker = createLeadtrekkerInstance();
			
			if (leadtrekker) {
				try {
					// Map field IDs to data for Form 2
					const name = data.input_1 || '';
					const surname = data.input_3 || '';
					const email = data.input_4 || '';
					const contactNumber = data.input_5 || '';
					const companyName = data.input_7 || '';
					const service = data.input_8 || '';
					const how = data.input_9 || '';
					const other = data.input_10 || '';
					const message = data.input_11 || '';
					
					const mobile = contactNumber?.toString().replace(/[\s\(\)\-]/g, '') || '';
					
					// Check if lead is not spam
					const isValidLead = await leadtrekker.checkLead(email?.toString() || '', name?.toString() || '');
					
					if (isValidLead) {
						// Prepare lead data
						const leadData = {
							name: name?.toString() || '',
							email: email?.toString() || '',
							number: mobile,
							company: companyName?.toString() || '',
							sourceid: data.sourceid || null,
							custom_fields: {
								'Surname': surname?.toString() || '',
								'Service': service?.toString() || '',
								'How Did You Hear About Us': how?.toString() || '',
								'Message': message?.toString() || '',
								'IP': request.headers.get("x-forwarded-for") || 
								     request.headers.get("x-real-ip") || 
								     "127.0.0.1"
							} as Record<string, string>
						};

						// Add "Other" field if it has a value
						if (other && other.toString().trim()) {
							leadData.custom_fields['Other'] = other.toString();
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
					} else {
						console.log('Lead rejected - spam detected:', email, name);
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
