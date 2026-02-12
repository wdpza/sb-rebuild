import { NextRequest, NextResponse } from "next/server";
import { createLeadtrekkerInstance } from "@/lib/services/leadtrekker";

export async function POST(request: NextRequest) {
	try {
		const { formId, data } = await request.json();

        console.log(data);

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

		// Submit to Leadtrekker (Form ID 2 - Contact Form)
		if (formId === 2 || formId === 1) {
			const leadtrekker = createLeadtrekkerInstance();
			
			if (leadtrekker) {
				try {
					// Map field IDs to data (based on Gravity Forms field structure)
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
