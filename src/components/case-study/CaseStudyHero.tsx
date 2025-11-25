import Image from "next/image";

type CaseStudy = {
	title?: string;
	caseStudies?: {
		headerText?: string | null;
		headerBackgroundImage?: { node?: { mediaItemUrl?: string; altText?: string } | null } | null;
		headerImage?: { node?: { mediaItemUrl?: string; altText?: string } | null } | null;
		headerLogo?: { node?: { mediaItemUrl?: string; altText?: string } | null } | null;
	};
};

export default function CaseStudyHero({ item }: { item: CaseStudy }) {
	const cs = item?.caseStudies;

	const background = cs?.headerBackgroundImage?.node?.mediaItemUrl;
	const mainImg = cs?.headerImage?.node?.mediaItemUrl;
	const mainAlt = cs?.headerImage?.node?.altText || item?.title || "Case study visual";

	const logoImg = cs?.headerLogo?.node?.mediaItemUrl;
	const logoAlt = cs?.headerLogo?.node?.altText || item?.title || "Client logo";

	const title = cs?.headerText || item?.title || "Case Study";

	return (
		<section
			className="relative flex min-h-screen h-screen w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden"
			style={background ? { backgroundImage: `url('${background}')` } : undefined}
		>
			<div className="layout-wrapper h-screen relative z-10 justify-center content-center">
				{/* Left Column */}
				<div className="flex flex-col justify-center gap-4">
					{logoImg ? (
						<Image
							className="self-center mb-16"
							src={logoImg}
							alt={logoAlt}
							width={320}
							height={80}
							priority
						/>
					) : null}
					<h1 className="font-archivo uppercase hero-title font-black drop-shadow-lg text-gradient-starbright text-center">
						{title}
					</h1>
				</div>

				{/* Right Column */}
				<div className="col-span-11 relative flex items-center justify-center -mb-24">
					{mainImg ? (
						<Image
							src={mainImg}
							alt={mainAlt}
							width={1200}
							height={1200}
							className="absolute max-h-[80vh] object-contain"
							style={{ bottom: "2px" }}
							priority
						/>
					) : null}
				</div>
			</div>
		</section>
	);
}
