type Item = {
	title: string;
	description: string;
};

export default function WhyWorkWithUsBreath({
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

			<div className="relative z-10 w-full layout-wrapper mx-auto flex flex-col items-center justify-center text-center text-neutral-softest px-4 md:px-6">
				{/* Title */}
				{introTitle && (
					<h2 className="subtitle font-bold mb-8 text-neutral-softest text-balance">
						{introTitle}
					</h2>
				)}

				{/* Cards Container */}
				<div
					className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-6 
            md:gap-8 
            w-full 
            justify-items-center
          "
				>
					{item.map((card: Item, index: number) => (
						<div
							key={index}
							className="
                p-6
                md:p-8 
                md:py-12
                flex 
                flex-col 
                justify-center 
                items-center 
                text-center 
                w-full 
                h-full 
                transition-transform 
                hover:scale-105 
                duration-300
              "
						>
							<h3 className="text-2xl md:text-3xl font-semibold mb-3 text-gradient-starbright">
								{card.title}
							</h3>
							<p className="font-extralight text-sm md:text-base text-neutral-softer leading-relaxed">
								{card.description}
							</p>
						</div>
					))}


				</div>

				{/* CTA Button */}
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