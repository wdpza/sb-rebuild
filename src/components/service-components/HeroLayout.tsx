import DOMPurify from 'isomorphic-dompurify';

export default function HeroLayout({ title, description, subTitle, backgrounD, image }: any) {
	const bgUrl = backgrounD?.node?.mediaItemUrl ?? null
	const imageUrl = image?.node?.mediaItemUrl ?? null

	return (
		<section
			className="relative flex min-h-screen h-screen w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden"
			style={{
				backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
			}}
		>
			<div className="h-screen relative z-10 grid w-full max-w-[1600px] mx-auto grid-cols-1 md:grid-cols-24 gap-2 px-12 py-24">
				{/* Left column: 60% */}
				<div className="col-span-13 flex flex-col justify-center text-left gap-4">
					<h1 className="font-archivo uppercase text-[75px]/20 font-black drop-shadow-lg text-gradient-starbright">
						{title}
					</h1>

					{/* If subtitle or description fields are added later, leave placeholders */}
					{subTitle && (
						<h2 className="leading-snug font-bold mt-4 text-[45px] text-neutral-softest drop-shadow-md tracking-wide">
							{subTitle}
						</h2>
					)}

					{description && (
						<div
							className="mt-6 text-lg text-gray-100"
							dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
						/>
					)}
				</div>

				{/* Right column: hero image */}
				{imageUrl && (
					<div className="col-span-11 flex justify-center items-center">
						<img
							src={imageUrl}
							alt={title ?? ""}
							className="absolute max-h-[80vh] object-contain"
							style={{ bottom: "2px" }}
						/>
					</div>
				)}
			</div>
		</section>
	)
}
