"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import type { ServiceOption } from "@/lib/graphql/queries/getServicesForForm";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface ContactFormProps {
	onSubmitSuccess?: () => void;
	services?: ServiceOption[];
}

function ContactFormContent({ onSubmitSuccess, services = [] }: ContactFormProps) {
	const { executeRecaptcha } = useGoogleReCaptcha();

	const [formData, setFormData] = useState({
		name: "",
		surname: "",
		email: "",
		contactNumber: "",
		companyName: "",
		service: "",
		sourceid: "",
		how: "",
		other: "",
		message: "",
		updates: false,
	});
	
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const searchParams = useSearchParams();

	useEffect(() => {
		const serviceParam = searchParams.get('service');
		if (serviceParam) {
			// Find the matching service to get its source ID
			const matchingService = services.find(s => s.slug === serviceParam);
			const sourceid = matchingService?.leadtrekker_source_id || '';
			setFormData((prev) => ({ ...prev, service: serviceParam, sourceid }));
		}
	}, [searchParams, services]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		// If changing service, also capture the sourceid from data-sourceid attribute
		if (name === 'service' && e.target instanceof HTMLSelectElement) {
			const selectedOption = e.target.selectedOptions[0];
			const sourceid = selectedOption?.getAttribute('data-sourceid') || '';
			setFormData((prev) => ({ ...prev, [name]: value, sourceid }));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!executeRecaptcha) {
			console.log('reCAPTCHA not yet available');
			return;
		}

		const token = await executeRecaptcha('contact_submit');

		console.log('Form submission data:', {
			formId: 2,
			data: formData,
			recaptchaToken: token
		});

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


			<div className="relative">
				<select
					name="service"
					id="service"
					onChange={handleChange}
					value={formData.service}
					required
					className="appearance-none h-full bg-[#1F1F1F96] placeholder-white text-neutral-softest border border-[#353536] p-3 rounded w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="">Select a Service*</option>
					<optgroup label="Design">
						<option value="graphic-design" data-sourceid={services.find(s => s.slug === 'graphic-design')?.leadtrekker_source_id || ''}>Graphic Design</option>
						<option value="ux-ui-design" data-sourceid={services.find(s => s.slug === 'ux-ui-design')?.leadtrekker_source_id || ''}>UX/UI Design</option>
						<option value="web-design" data-sourceid={services.find(s => s.slug === 'web-design')?.leadtrekker_source_id || ''}>Web Design</option>
					</optgroup>
					<optgroup label="Development">
						<option value="website-development" data-sourceid={services.find(s => s.slug === 'website-development')?.leadtrekker_source_id || ''}>Website Development</option>
						<option value="custom-development" data-sourceid={services.find(s => s.slug === 'custom-development')?.leadtrekker_source_id || ''}>Custom Development</option>
						<option value="hosting-services" data-sourceid={services.find(s => s.slug === 'hosting-services')?.leadtrekker_source_id || ''}>Hosting Services</option>
					</optgroup>
					<optgroup label="Digital Marketing">
						<option value="google-ads" data-sourceid={services.find(s => s.slug === 'google-ads')?.leadtrekker_source_id || ''}>Google Ads</option>
						<option value="search-engine-optimisation" data-sourceid={services.find(s => s.slug === 'search-engine-optimisation')?.leadtrekker_source_id || ''}>Search Engine Optimisation</option>
						<option value="social-media" data-sourceid={services.find(s => s.slug === 'social-media')?.leadtrekker_source_id || ''}>Social Media</option>
						<option value="copywriting" data-sourceid={services.find(s => s.slug === 'copywriting')?.leadtrekker_source_id || ''}>Copywriting</option>
						<option value="email-marketing" data-sourceid={services.find(s => s.slug === 'email-marketing')?.leadtrekker_source_id || ''}>Email Marketing</option>
					</optgroup>
					<optgroup label="Photography">
						<option value="studio-photography" data-sourceid={services.find(s => s.slug === 'studio-photography')?.leadtrekker_source_id || ''}>Studio Photography</option>
						<option value="studio-hire" data-sourceid={services.find(s => s.slug === 'studio-hire')?.leadtrekker_source_id || ''}>Studio Hire</option>
					</optgroup>
					<optgroup label="Business Solutions">
						<option value="google-workspace" data-sourceid={services.find(s => s.slug === 'google-workspace')?.leadtrekker_source_id || ''}>Google Workspace</option>
						<option value="google-review-booster" data-sourceid={services.find(s => s.slug === 'google-review-booster')?.leadtrekker_source_id || ''}>Google Review Booster</option>
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

			<div
				className={`md:col-span-2 flex flex-col md:flex-row gap-6 transition-all duration-300 ${isOtherSelected ? "items-stretch" : "items-center"
					}`}
			>
				<div className="relative flex-1 h-full w-full">
					<select
						name="how"
						value={formData.how}
						onChange={handleChange}
						required
						className="appearance-none h-full bg-[#1F1F1F96] placeholder-white text-neutral-softest border border-[#353536] p-3 rounded w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">How did you hear about us?*</option>
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

			<textarea
				name="message"
				placeholder="Message*"
				value={formData.message}
				onChange={handleChange}
				required
				className="bg-[#1F1F1F96] placeholder-white text-neutral-softest md:col-span-2 border border-[#353536] p-3 rounded w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			{/* Receive updates */}
			<div className="md:col-span-2 flex items-center">
				<input
					type="checkbox"
					id="updates"
					name="updates"
					checked={formData.updates}
					onChange={(e) => setFormData((prev) => ({ ...prev, updates: e.target.checked }))}
					className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
				/>
				<label htmlFor="updates" className="text-neutral-softest">
					I would like to receive updates and offers from Starbright.
				</label>
			</div>

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

export default function ContactForm({ onSubmitSuccess, services }: ContactFormProps) {
	return (
		<GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}>
			<Suspense fallback={<div className="bg-[#1F1F1F96] border border-[#353536] p-6 rounded animate-pulse">Loading form...</div>}>
				<ContactFormContent onSubmitSuccess={onSubmitSuccess} services={services} />
			</Suspense>
		</GoogleReCaptchaProvider>
	);
}
