import DOMPurify from 'isomorphic-dompurify';
import Link from "next/link";
import Image from "next/image";

export default function HeroLayout({ title, ctaLink, description, subTitle, backgrounD, image }: any) {
	const bgUrl = backgrounD?.node?.mediaItemUrl ?? null
	const imageUrl = image?.node?.mediaItemUrl ?? null

  const cleanUrl = ctaLink?.url
    ? ctaLink.url.replace(/^https?:\/\/[^/]+/, "")
    : null;

	return (
		<section
			className="relative flex min-h-[70vh] w-full items-end bg-cover bg-bottom bg-no-repeat overflow-hidden gradient-border-bottom pb-32"
			style={{
				backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
			}}
		>
			<div className="relative z-10 grid w-full layout-wrapper mx-auto grid-cols-1 md:grid-cols-24 gap-2">

				<div className="col-span-24 flex flex-col justify-center text-center gap-4">
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
		</section>
	)
}
