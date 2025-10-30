import DOMPurify from 'isomorphic-dompurify';
import ContactForm from "@/components/shared/ContactForm"

export default function HeroLayout({ title, description, subTitle, background, image, showContactForm }: any) {
	
	const bgUrl = background?.node?.mediaItemUrl ?? null
	const imageUrl = image?.node?.mediaItemUrl ?? null

	return (
		<section
			className="relative flex min-h-screen w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden"
			style={{
				backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
			}}
		>
			<div className="min-h-screen relative z-10 grid w-full max-w-[1600px] mx-auto grid-cols-1 md:grid-cols-24 gap-2 px-12 py-24">
				{/* Left column: 60% */}
				<div className="col-span-13 flex flex-col justify-center text-left gap-4 mt-12">
					<h1 className="font-archivo uppercase text-[55px]/15 lg:text-[75px]/20 font-black drop-shadow-lg text-gradient-starbright text-center md:text-left">
						{title}
					</h1>

					{/* If subtitle or description fields are added later, leave placeholders */}
					{subTitle && (
						<h2 className="leading-tight font-bold mt-4 text-[35px] lg:text-[45px] text-neutral-softest drop-shadow-md tracking-wide text-center md:text-left">
							{subTitle}
						</h2>
					)}

					{description && (
						<div
							className="mt-6 text-lg text-gray-100 text-center md:text-left"
							dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
						/>
					)}
					{showContactForm?.includes("1") && (
						<div className="text-white mb-4">
							<ContactForm />
						</div>
					)}
				</div>

				{/* Right column: hero image */}
				{imageUrl && (
					// <div className="col-span-11 flex justify-center items-center">
					<div className="z-[-1] opacity-60 md:opacity-100 col-span-11 flex justify-center items-center">
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
