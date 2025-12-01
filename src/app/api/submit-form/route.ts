import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
	try {
		const { formId, data } = await request.json();

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

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error("Error submitting form:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to submit form" },
			{ status: 500 }
		);
	}
}
