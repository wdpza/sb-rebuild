"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

type Item = {
	title: string;
	description: string;
	ctaLink?: {
		title?: string;
		url?: string;
	};
};

export default function WhyWorkWithUsDivider({
	introTitle,
	introText,
	item,
	backgroundImage,
	ctaButtonGroup,
	slug,
	columns
}: any) {
	const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;
	const { buttonLabel, ctaButtonUrl } = ctaButtonGroup || {};
	const effectiveColumns = columns ?? 3;
	const gridColsClass: Record<number, string> = {
		1: 'md:grid-cols-1',
		2: 'md:grid-cols-2',
		3: 'md:grid-cols-3',
		4: 'md:grid-cols-4',
		5: 'md:grid-cols-5',
		6: 'md:grid-cols-6',
	};

	return (
		<div
			id="services"
			className="relative py-16 md:py-32 bg-cover bg-center bg-no-repeat bg-sb-black"
		>

			<div className="relative z-10 w-full layout-wrapper mx-auto flex flex-col items-center justify-center text-left text-neutral-softest px-4 md:px-6">
				
				{introTitle && (
					<h2 className="subtitle font-bold mb-8 text-neutral-softest text-balance">
						{introTitle}
					</h2>
				)}

				{introText && (
					<p className="text-balance text-xl mt-6 mb-12 text-white/80">{introText}</p>
				)}
				
			<div className={`
				grid 
				grid-cols-1 
				${gridColsClass[effectiveColumns] || 'md:grid-cols-3'}
				w-full
			`}>
				{item.map((card: Item, index: number) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ 
							duration: 0.3, 
							delay: index * 0.5,
							ease: "linear"
						}}
						viewport={{ once: false, amount: 0.2 }}
						className="
							relative
							p-6
							md:p-8 
							md:py-12
							flex 
							flex-col 
							transition-transform 
							hover:scale-105
							duration-600
							mb-8
						"
					>
						{(index + 1) % effectiveColumns !== 0 && index < item.length - 1 && (
							<div 
								className="hidden md:block absolute right-0 top-0 bottom-0 w-px" 
								style={{
									background: 'linear-gradient(to bottom, var(--color-blue-softer, #36aefa) 0%, var(--color-purple-regular, #bd208b) 37.5%, var(--color-orange-regular, #f15d22) 87.02%, var(--color-yellow-regular, #eeb42c) 99.99%)'
								}}
							/>
						)}
						<h3 className="text-2xl md:text-3xl font-semibold mb-3 text-white">
							{card.title}
						</h3>
						<p className="font-extralight text-sm md:text-base text-neutral-softer leading-relaxed">
							{card.description}
						</p>
						{card.ctaLink?.url && card.ctaLink.title && (
							<div className="mt-6">
								<Link
									href={card.ctaLink.url.replace(/^https?:\/\/[^/]+/, "")}
									className="
										inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-neutral-softest gradient-border
										hover:bg-gradient-starbright
									"
								>
									{card.ctaLink.title}
								</Link>
							</div>
						)}
					</motion.div>
				))}
			</div>

				{buttonLabel && ctaButtonUrl?.nodes && ctaButtonUrl.nodes.length > 0 && (
					<div className="mt-8">
						<Link
							href={`${ctaButtonUrl.nodes[0].uri || '#'}${slug ? `?service=${slug}` : ''}`}
							className="
								inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-neutral-softest gradient-border
								hover:bg-gradient-starbright
							"
						>
							{buttonLabel}
						</Link>
					</div>
				)}
				
			</div>
		</div>
	);
}