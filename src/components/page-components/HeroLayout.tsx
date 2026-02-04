'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "../shared/ContactForm";
import { motion } from "framer-motion";
import { createSafeHtml } from "@/lib/utils/sanitize";
import { ANIMATION_DURATIONS, ANIMATION_DELAYS, ANIMATION_EASINGS, ANIMATION_DISTANCES } from "@/lib/constants/animations";
import type { HeroLayoutProps } from "@/types/common";

export default function HeroLayout({
title,
description,
subTitle,
background,
image,
ctaLink,
showContactForm,
forms
}: HeroLayoutProps) {
	const [submitted, setSubmitted] = useState(false);
	const bgUrl = background?.node?.mediaItemUrl ?? null;
	const imageUrl = image?.node?.mediaItemUrl ?? null;

	const showForm = forms?.showForm === true;
	const hasForm = showContactForm?.includes("1")

	const sectionHeight = title ? "md:min-h-screen" : "md:h-[160px]";

	// Dynamic adjustments
	const colSpanLeft = showForm ? "col-span-12" : "col-span-13";
	const colSpanRight = showForm ? "col-span-12" : "col-span-11";
	const subTitleSize = showForm ? "font-normal text-[20px] lg:text-[24px]" : "hero-subtitle";
	const paddingY = showForm ? "py-32" : "py-24";

	const handleFormSubmit = () => {
		setSubmitted(true);
	};

	return (
<section
			className={`relative flex w-full items-center overflow-hidden ${sectionHeight}`}
		>
			{/* Optimized background image using Next.js Image */}
			{bgUrl && (
				<Image
					src={bgUrl}
					alt="Background"
					fill
					className="object-cover object-bottom"
					quality={100}
					priority
					sizes="100vw"
				/>
			)}
			
			<div className={`relative z-10 grid layout-wrapper grid-cols-1 md:grid-cols-24 gap-2 ${paddingY} ${title ? "min-h-screen" : "h-[160px]"}`}>

				{/* Left column */}
				<div className={`${colSpanLeft} flex flex-col justify-center text-left gap-8 md:gap-4 mt-12 z-4`}>

					{title && (
						<motion.h1
							className="font-archivo uppercase hero-title font-black drop-shadow-lg text-gradient-starbright text-center md:text-left text-balance"
							initial={{ opacity: 0, x: -ANIMATION_DISTANCES.medium }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: ANIMATION_DURATIONS.slow, ease: ANIMATION_EASINGS.easeOut, delay: ANIMATION_DELAYS.short }}
						>
							{submitted && hasForm ? "Thank you for contacting Starbright" : title}
						</motion.h1>
					)}

					{(subTitle || (submitted && hasForm)) && (
						<motion.h2
							className={`leading-tight mt-4 ${subTitleSize} text-neutral-softest drop-shadow-md tracking-wide text-center md:text-left`}
							initial={{ opacity: 0, x: -ANIMATION_DISTANCES.medium }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: ANIMATION_DURATIONS.slow, ease: ANIMATION_EASINGS.easeOut, delay: ANIMATION_DELAYS.medium }}
						>
							{submitted && hasForm 
								? "Your enquiry has been successfully submitted. Our team will review your message and get back to you as soon as possible."
								: subTitle
							}
						</motion.h2>
					)}

					{description && (
						<motion.div
							className="hero-description mt-6 mb-6 text-neutral-softest text-center md:text-left"
							dangerouslySetInnerHTML={createSafeHtml(description)}
							initial={{ opacity: 0, x: -ANIMATION_DISTANCES.medium }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: ANIMATION_DURATIONS.slow, ease: ANIMATION_EASINGS.easeOut, delay: ANIMATION_DELAYS.long }}
						/>
					)}

					{ctaLink && (
						<div className="mt-8 flex justify-center md:justify-start">
							<Link
								href={ctaLink.url}
								className="
									bg-neutral-strongest
									gradient-border
									inline-block px-8 py-3 
									text-neutral-softest font-semibold uppercase 
									rounded-md shadow-md 
									transition-all duration-300 
									hover:bg-gradient-starbright
								"
							>
								{ctaLink.title}
							</Link>
						</div>
					)}

					{hasForm && !submitted && (
						<div className="text-neutral-softest mb-4">
						<p className='text-lg font-light mt-6 mb-6 text-neutral-softest text-center md:text-left md:pr-12 mb-12'>Please fill out our contact form. Once you hit submit, our team will be in touch faster than you can say &ldquo;strategy&rdquo;.</p>
						<ContactForm onSubmitSuccess={handleFormSubmit} />
					</div>
				)}

			</div>

				{/* Right column */}
				{imageUrl && (
					<div className={`z-[-1] opacity-60 md:opacity-100 ${colSpanRight} justify-center items-center hidden md:flex`}>
						<Image
							src={imageUrl}
							alt={title ?? "Hero image"}
							width={800}
							height={600}
							className="absolute max-h-[80vh] object-contain"
							style={{ bottom: "2px" }}
							priority
						/>
					</div>
				)}
			</div>
		</section>
	);
}
