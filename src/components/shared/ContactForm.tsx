"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface ContactFormProps {
	onSubmitSuccess?: () => void;
}

export default function ContactForm({ onSubmitSuccess }: ContactFormProps) {
	const [formData, setFormData] = useState({
		name: "",
		surname: "",
		email: "",
		contactNumber: "",
		companyName: "",
		service: "",
		how: "",
		other: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const searchParams = useSearchParams();

	useEffect(() => {
		const serviceParam = searchParams.get('service');
		if (serviceParam) {
			setFormData((prev) => ({ ...prev, service: serviceParam }));
		}
	}, [searchParams]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);

		try {
			const response = await fetch("/api/submit-form", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					formId: 2,
					data: formData,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to submit form");
			}

			const result = await response.json();

			if (result.success && onSubmitSuccess) {
				onSubmitSuccess();
			}
		} catch (err) {
			console.error("Error submitting form:", err);
			setError("There was an error submitting your form. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const isOtherSelected = formData.how === "Other";

	return (
		<form
			onSubmit={handleSubmit}
			className="flex grid grid-cols-1 md:grid-cols-2 gap-6"
		>
			{error && (
				<div className="md:col-span-2 bg-red-500/10 border border-red-500 text-red-500 p-4 rounded">
					{error}
				</div>
			)}

			{/* --- Basic Fields --- */}
			<input
				type="text"
				name="name"
				placeholder="Name*"
				required
				value={formData.name}
				onChange={handleChange}
				className="bg-[#1F1F1F96] placeholder-white text-neutral-softest border border-[#353536] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			<input
				type="text"
				name="surname"
				placeholder="Surname*"
				required
				value={formData.surname}
				onChange={handleChange}
				className="bg-[#1F1F1F96] placeholder-white text-neutral-softest border border-[#353536] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			<input
				type="email"
				name="email"
				placeholder="Email Address*"
				required
				value={formData.email}
				onChange={handleChange}
				className="bg-[#1F1F1F96] placeholder-white text-neutral-softest border border-[#353536] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			<input
				type="text"
				name="contactNumber"
				placeholder="Contact Number*"
				required
				value={formData.contactNumber}
				onChange={handleChange}
				className="bg-[#1F1F1F96] placeholder-white text-neutral-softest border border-[#353536] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			<input
				type="text"
				name="companyName"
				placeholder="Company Name*"
				required
				value={formData.companyName}
				onChange={handleChange}
				className="bg-[#1F1F1F96] placeholder-white text-neutral-softest border border-[#353536] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			{/* --- Service Dropdown --- */}
			<div className="relative">

				<select
					name="service"
					id="service"
					onChange={handleChange}
					value={formData.service}
					className="appearance-none h-full bg-[#1F1F1F96] placeholder-white text-neutral-softest border border-[#353536] p-3 rounded w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					{/* Design */}
					<optgroup label="Design">
						<option value="graphic-design">Graphic Design</option>
						<option value="ux-ui-design">UX/UI Design</option>
						<option value="web-design">Web Design</option>
					</optgroup>

					{/* Development */}
					<optgroup label="Development">
						<option value="website-development">Website Development</option>
						<option value="custom-development">Custom Development</option>
						<option value="hosting-services">Hosting Services</option>
					</optgroup>

					{/* Digital Marketing */}
					<optgroup label="Digital Marketing">
						<option value="google-ads">Google Ads</option>
						<option value="search-engine-optimisation">Search Engine Optimisation</option>
						<option value="social-media">Social Media</option>
						<option value="copywriting">Copywriting</option>
						<option value="email-marketing">Email Marketing</option>
					</optgroup>

					{/* Photography */}
					<optgroup label="Photography">
						<option value="studio-photography">Studio Photography</option>
						<option value="studio-hire">Studio Hire</option>
					</optgroup>

					{/* Business Solutions */}
					<optgroup label="Business Solutions">
						<option value="google-workspace">Google Workspace</option>
						<option value="google-review-booster">Google Review Booster</option>
					</optgroup>
				</select>

				<span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
					<Image
						src="/images/select-down.png"
						alt="Dropdown arrow"
						width={20}
						height={11}
					/>
				</span>
			</div>

			{/* --- "How did you hear about us" Section --- */}
			<div
				className={`md:col-span-2 flex flex-col md:flex-row gap-6 transition-all duration-300 ${isOtherSelected ? "items-stretch" : "items-center"
					}`}
			>
				{/* Select */}
				<div
					className="relative flex-1 h-full w-full"
					style={{ minWidth: "calc(50% - 15px)" }}
				>
					<select
						name="how"
						required
						value={formData.how}
						onChange={handleChange}
						className="appearance-none h-full bg-[#1F1F1F96] placeholder-white text-neutral-softest border border-[#353536] p-3 rounded w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">How did you hear about us*</option>
						<option>Google</option>
						<option>Word of Mouth</option>
						<option>Billboard</option>
						<option>Social Media</option>
						<option>Email newsletter</option>
						<option>SMS Campaign</option>
						<option>Returning Client</option>
						<option>Other</option>
					</select>
					<span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
						<Image
							src="/images/select-down.png"
							alt="Dropdown arrow"
							width={20}
							height={11}
						/>
					</span>
				</div>

				{/* “Other” Field */}
				{isOtherSelected && (
					<input
						type="text"
						name="other"
						placeholder="Please specify other*"
						required
						value={formData.other}
						onChange={handleChange}
						className="flex-1 h-full bg-[#1F1F1F96] placeholder-white text-neutral-softest border border-[#353536] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				)}
			</div>

			{/* --- Message Field --- */}
			<textarea
				name="message"
				placeholder="Message"
				value={formData.message}
				onChange={handleChange}
				className="bg-[#1F1F1F96] placeholder-white text-neutral-softest md:col-span-2 border border-[#353536] p-3 rounded w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			{/* --- Submit Button --- */}
			<button
				type="submit"
				disabled={isSubmitting}
				className="cursor-pointer inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-neutral-softest gradient-border md:col-span-2 w-auto justify-self-start disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isSubmitting ? "Sending..." : "Send Enquiry"}
			</button>
		</form>
	);
}