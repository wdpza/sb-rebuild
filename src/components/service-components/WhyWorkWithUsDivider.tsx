import React from 'react';

type Item = {
	title: string;
	description: string;
};

export default function WhyWorkWithUsDivider({
	introTitle,
	item,
	backgroundImage,
	ctaButtonGroup
}: any) {
	const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;
	const { buttonLabel, ctaButtonUrl } = ctaButtonGroup || {};

	return (
		<div
			className="relative py-16 md:py-32 bg-cover bg-center bg-no-repeat bg-sb-black"
		>

			<div className="relative z-10 w-full layout-wrapper mx-auto flex flex-col items-center justify-center text-left text-neutral-softest px-4 md:px-6">
				
				{introTitle && (
					<h2 className="subtitle font-bold mb-8 text-neutral-softest text-balance">
						{introTitle}
					</h2>
				)}
				
				<div className="w-full flex flex-col md:flex-row">
					{item.map((card: Item, index: number) => (
						<React.Fragment key={index}>
							<div
								className="
									p-6
									md:p-8 
									md:py-12
									flex 
									flex-col 
									flex-1
									transition-transform 
									hover:scale-105 
									duration-300
								"
							>
								<h3 className="text-2xl md:text-3xl font-semibold mb-3 text-white">
									{card.title}
								</h3>
								<p className="font-extralight text-sm md:text-base text-neutral-softer leading-relaxed">
									{card.description}
								</p>
							</div>
							{index < item.length - 1 && (
								<div 
									className="hidden md:block w-px self-stretch" 
									style={{
										background: 'linear-gradient(to bottom, var(--color-blue-softer, #36aefa) 0%, var(--color-purple-regular, #bd208b) 37.5%, var(--color-orange-regular, #f15d22) 87.02%, var(--color-yellow-regular, #eeb42c) 99.99%)'
									}}
								/>
							)}
						</React.Fragment>
					))}
				</div>

				<div className="mt-8">
					{buttonLabel && ctaButtonUrl?.nodes && ctaButtonUrl.nodes.length > 0 && (
						<a
							href={ctaButtonUrl.nodes[0].uri || '#'}
							className="
								inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-neutral-softest gradient-border
								hover:bg-gradient-starbright
							"
						>
							{buttonLabel}
						</a>
					)}
				</div>
			</div>
		</div>
	);
}