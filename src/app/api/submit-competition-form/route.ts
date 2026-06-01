import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createLeadtrekkerInstance } from "@/lib/services/leadtrekker";
import { createEverlyticInstance } from "@/lib/services/everlytic";
import { parseUrlTracking } from "@/lib/utils/urltracking";

const COMPETITION_SOURCE_ID = "10233";

export async function POST(request: NextRequest) {
	try {
		const { data, recaptchaToken } = await request.json();

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
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
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
			challenge_ts: recaptchaData.challenge_ts,
			"error-codes": recaptchaData["error-codes"],
		});

		if (!recaptchaData.success || recaptchaData.score < 0.5) {
			console.error("reCAPTCHA verification failed:", recaptchaData);
			return NextResponse.json(
				{ success: false, error: "reCAPTCHA failed" },
				{ status: 403 }
			);
		}

		if (data._hp && data._hp.toString().trim() !== "") {
			console.warn("Honeypot triggered - spam submission rejected");
			return NextResponse.json({ success: true }, { status: 200 });
		}

		if (data.contactNumber && !/\d/.test(data.contactNumber.toString())) {
			console.warn("Invalid phone number - spam submission rejected:", data.contactNumber);
			return NextResponse.json(
				{ success: false, error: "Invalid phone number" },
				{ status: 400 }
			);
		}

		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: parseInt(process.env.EMAIL_PORT || "587", 10),
			secure: process.env.EMAIL_PORT === "465",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const formFields = Object.entries(data)
			.map(([key, value]) => `<strong>${key}:</strong> ${value}`)
			.join("<br>");

		await transporter.sendMail({
			from: process.env.EMAIL_FROM || "noreply@starbright.co.za",
			to: process.env.EMAIL_TO || process.env.EMAIL_USER,
			subject: "Competition Form Submission",
			html: `
				<h2>New Competition Form Submission</h2>
				<p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
				<hr>
				<h3>Form Data:</h3>
				${formFields}
			`,
		});

		const leadtrekker = createLeadtrekkerInstance();
		const everlytic = createEverlyticInstance();

		if (leadtrekker) {
			try {
				const mobile = data.contactNumber?.toString().replace(/[\s\(\)\-]/g, "") || "";
				const email = data.email?.toString() || "";
				const firstName = data.name?.toString() || "";
				const surname = data.surname?.toString() || "";
				const fullName = `${firstName} ${surname}`.trim();

				const isValidLead = await leadtrekker.checkLead(email, firstName);

				if (isValidLead) {
					const leadData = {
						name: firstName,
						email,
						number: mobile,
						company: data.company?.toString() || "",
						sourceid: COMPETITION_SOURCE_ID,
						custom_fields: {
							Surname: surname,
							"Social Channel": data.socialChannel?.toString() || "",
							"Platform Username": data.platformUsername?.toString() || "",
							"Existing Website URL": data.websiteUrl?.toString() || "",
							"Opt-in for updates": data.updates ? "Yes" : "No",
							IP: request.headers.get("x-forwarded-for") ||
								request.headers.get("x-real-ip") ||
								"127.0.0.1",
						} as Record<string, string>,
					};

					const trackingParams: Record<string, string> = {};
					request.nextUrl.searchParams.forEach((value, key) => {
						trackingParams[key] = value;
					});
					leadtrekker.addParams(leadData, trackingParams);

					const sessionTracking = parseUrlTracking(data.urltracking);
					if (sessionTracking) {
						leadtrekker.addParams(leadData, sessionTracking);
					}

					const leadResult = await leadtrekker.pushLead(leadData);
					console.log("Competition Leadtrekker lead created:", leadResult);

					if (data.updates) {
						if (everlytic) {
							try {
								const everlyticData = {
									name: fullName,
									email,
									mobile,
									on_duplicate: "update",
									list_id: {
										"237396": "subscribed",
										"209951": "subscribed",
										"205234": "subscribed",
										"205233": "subscribed",
										"210461": "subscribed",
										"211945": "subscribed",
									},
								};

								const everlyticResult = await everlytic.pushLead(everlyticData);
								console.log("Everlytic contact created/updated:", everlyticResult);
							} catch (everlyticError) {
								console.error("Failed to submit to Everlytic:", everlyticError);
							}
						} else {
							console.warn("Everlytic not configured, skipping contact creation");
						}
					}
				} else {
					console.log("Competition lead rejected - spam detected:", email, firstName);
				}
			} catch (leadtrekkerError) {
				console.error("Failed to submit competition lead to Leadtrekker:", leadtrekkerError);
			}
		}

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error("Error submitting competition form:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to submit competition form" },
			{ status: 500 }
		);
	}
}
