import DOMPurify from 'isomorphic-dompurify';
import Link from "next/link";
import Image from "next/image";
import LogoSliderLayout from '../shared/LogoSliderLayout';

export default function HeroLayout({ title, ctaLink, description, subTitle, backgrounD, image, logoSlider }: any) {
	const bgUrl = backgrounD?.node?.mediaItemUrl ?? null;
	const imageUrl = image?.node?.mediaItemUrl ?? null;

	const { logos, show } = logoSlider || {};

	const cleanUrl = ctaLink?.url
		? ctaLink.url.replace(/^https?:\/\/[^/]+/, "")
		: null;

	return (
		<section
			className="relative flex min-h-[100vh] w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden gradient-border-bottom"
			style={{
				backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
				backgroundSize: "cover",
				backgroundPosition: "bottom center",
			}}
		>
			<div className="absolute inset-0 bg-linear-to-r from-black/75 to-black/60 backdrop-grayscale z-0"></div>
			<div className="relative z-10 grid w-full layout-wrapper mx-auto grid-cols-1 md:grid-cols-24 gap-2">

				<div className="col-span-12 flex flex-col justify-center text-left gap-4">
					<h1 className="font-archivo uppercase hero-title font-black drop-shadow-lg text-gradient-starbright">
						{title}
					</h1>

					{subTitle && (
						<h2 className="leading-snug font-bold mt-4 hero-subtitle text-neutral-softest drop-shadow-md tracking-wide">
							{subTitle}
						</h2>
					)}

					{description && (
						<div
							className="mt-6 text-lg text-gray-100"
							dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
						/>
					)}

					{ctaLink && (
						<div className="mt-8">
							<Link
								href={cleanUrl}
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
						</div>
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
