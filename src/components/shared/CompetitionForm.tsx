"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { getSessionUrlTracking } from "@/lib/utils/urltracking";

interface ContactFormProps {
	onSubmitSuccess?: () => void;
}

function CompetitionFormContent({ onSubmitSuccess }: ContactFormProps) {
	const { executeRecaptcha } = useGoogleReCaptcha();

	const [formData, setFormData] = useState({
		name: "",
		surname: "",
		company: "",
		contactNumber: "",
		email: "",
		socialChannel: "",
		platformUsername: "",
		websiteUrl: "",
		updates: false,
		_hp: "", // honeypot — must remain empty
	});
	
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!executeRecaptcha) {
			console.log('reCAPTCHA not yet available');
			return;
		}

		const token = await executeRecaptcha('competition_submit');

		const urltracking = getSessionUrlTracking();

		console.log('Form submission data:', {
			formId: 3,
			data: formData,
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
					formId: 3,
					data: { ...formData, ...(urltracking !== null ? { urltracking } : {}) },
					recaptchaToken: token
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

			{/* Honeypot field — hidden from humans, bots fill it in */}
			<input
				type="text"
				name="_hp"
				value={formData._hp}
				onChange={handleChange}
				autoComplete="off"
				tabIndex={-1}
				aria-hidden="true"
				style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
			/>

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
				name="company"
				placeholder="Company*"
				required
				value={formData.company}
				onChange={handleChange}
				className="bg-[#1F1F1F96] placeholder-white text-neutral-softest border border-[#353536] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			<div className="relative">
				<select
					name="socialChannel"
					id="socialChannel"
					onChange={handleChange}
					value={formData.socialChannel}
					required
					className="appearance-none h-full bg-[#1F1F1F96] placeholder-white text-neutral-softest border border-[#353536] p-3 rounded w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="">On which social channel did you follow us?*</option>
					<option value="Facebook">Facebook</option>
					<option value="Linkedin">Linkedin</option>
					<option value="Instagram">Instagram</option>
					<option value="Tiktok">Tiktok</option>
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

			<input
				type="text"
				name="platformUsername"
				placeholder="What is your name/username on the selected platform?*"
				required
				value={formData.platformUsername}
				onChange={handleChange}
				className="bg-[#1F1F1F96] placeholder-white text-neutral-softest border border-[#353536] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			<input
				type="url"
				name="websiteUrl"
				placeholder="Existing Website URL*"
				required
				value={formData.websiteUrl}
				onChange={handleChange}
				className="bg-[#1F1F1F96] placeholder-white text-neutral-softest md:col-span-2 border border-[#353536] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
				{isSubmitting ? "Submitting..." : "Submit Entry"}
			</button>
		</form>
	);
}

export default function CompetitionForm({ onSubmitSuccess }: ContactFormProps) {
	return (
		<GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}>
			<Suspense fallback={<div className="bg-[#1F1F1F96] border border-[#353536] p-6 rounded animate-pulse">Loading form...</div>}>
				<CompetitionFormContent onSubmitSuccess={onSubmitSuccess} />
			</Suspense>
		</GoogleReCaptchaProvider>
	);
}
