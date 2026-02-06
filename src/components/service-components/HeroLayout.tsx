'use client'

import DOMPurify from 'isomorphic-dompurify';
import { useParams } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import LogoSliderLayout from '../shared/LogoSliderLayout';
import { ANIMATION_DURATIONS, ANIMATION_DELAYS, ANIMATION_EASINGS, ANIMATION_DISTANCES } from "@/lib/constants/animations";

export default function HeroLayout({ title, ctaLink, description, subTitle, backgrounD, image, logoSlider }: any) {
	const params = useParams<{ slug: string; }>()
	const {slug} = params;
	
	const bgUrl = backgrounD?.node?.mediaItemUrl ?? null;
	const imageUrl = image?.node?.mediaItemUrl ?? null;

	const { logos, show } = logoSlider || {};

	const cleanUrl = ctaLink?.url
		? ctaLink.url.replace(/^https?:\/\/[^/]+/, "")
		: null;

	return (
		<section
			className="relative flex min-h-[100vh] w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden"
			style={{
				backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
				backgroundSize: "cover",
				backgroundPosition: "bottom center",
			}}
		>
			<div className="absolute inset-0 bg-linear-to-r from-sb-black to-black/60 backdrop-grayscale z-0"></div>
			<div className="relative z-10 grid w-full layout-wrapper mx-auto grid-cols-1 md:grid-cols-24 gap-2">

				<div className="col-span-18 flex flex-col justify-center text-left gap-4">
					<motion.h1
						className="font-archivo uppercase hero-title font-black drop-shadow-lg text-gradient-starbright"
						initial={{ opacity: 0, x: -ANIMATION_DISTANCES.medium }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: ANIMATION_DURATIONS.slow, ease: ANIMATION_EASINGS.easeOut, delay: ANIMATION_DELAYS.short }}
					>
						{title}
					</motion.h1>

					{subTitle && (
						<motion.h2
							className="leading-snug font-bold mt-4 hero-subtitle text-neutral-softest drop-shadow-md tracking-wide"
							initial={{ opacity: 0, x: -ANIMATION_DISTANCES.medium }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: ANIMATION_DURATIONS.slow, ease: ANIMATION_EASINGS.easeOut, delay: ANIMATION_DELAYS.medium }}
						>
							{subTitle}
						</motion.h2>
					)}

					{description && (
						<motion.div
							className="mt-6 text-lg text-gray-100"
							dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
							initial={{ opacity: 0, x: -ANIMATION_DISTANCES.medium }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: ANIMATION_DURATIONS.slow, ease: ANIMATION_EASINGS.easeOut, delay: ANIMATION_DELAYS.long }}
						/>
					)}

					{ctaLink && (
						<motion.div
							className="mt-8"
							initial={{ opacity: 0, x: -ANIMATION_DISTANCES.medium }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: ANIMATION_DURATIONS.slow, ease: ANIMATION_EASINGS.easeOut, delay: ANIMATION_DELAYS.long }}
						>
							<Link
								href={`${cleanUrl}${cleanUrl?.includes('/contact') && slug ? `?service=${slug}` : ''}`}
								className="
									bg-neutral-strongest
									gradient-border
									inline-block px-8 py-3 
									text-neutral-softest font-semibold uppercase 
									rounded-lg shadow-md 
									transition-all duration-300 
									hover:bg-gradient-starbright
								"
							>
								{ctaLink.title}
							</Link>
						</motion.div>
					)}
				</div>

				{/* Right column: hero image */}
				{imageUrl && (
					<div className="col-span-11 flex justify-center items-center">
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

			{show && show[0] === 'Yes' && logos && logos.length > 0 && (
				<div className="absolute bottom-0 w-full">
					<LogoSliderLayout logos={logos} />
				</div>
			)}

		</section>
	)
}
