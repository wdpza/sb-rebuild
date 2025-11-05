import DOMPurify from 'isomorphic-dompurify'
import ContactForm from "@/components/shared/ContactForm"

export default function HeroLayout({ title, description, subTitle, background, image, showContactForm }: any) {
	const bgUrl = background?.node?.mediaItemUrl ?? null
	const imageUrl = image?.node?.mediaItemUrl ?? null
	const hasForm = showContactForm?.includes("1")
	const sectionHeight = title ? "min-h-screen" : "h-[160px]"

	// Dynamic adjustments
	const colSpanLeft = hasForm ? "col-span-15" : "col-span-13"
	const colSpanRight = hasForm ? "col-span-9" : "col-span-11"
	const subTitleSize = hasForm ? "text-[24px] lg:text-[24px]" : "text-[35px] lg:text-[45px]"
	const paddingY = hasForm ? "py-32" : "py-24"

	return (
		<section
			className={`relative flex w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden ${sectionHeight}`}
			style={{
				backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
			}}
		>
			<div className={`relative z-10 grid w-full max-w-[1600px] mx-auto grid-cols-1 md:grid-cols-24 gap-2 px-12 ${paddingY} ${title ? "min-h-screen" : "h-[160px]"}`}>
				
				{/* Left column (text + form) */}
				<div className={`${colSpanLeft} flex flex-col justify-center text-left gap-4 mt-12`}>
					{title && (
						<h1 className="font-archivo uppercase text-[55px]/15 lg:text-[75px]/20 font-black drop-shadow-lg text-gradient-starbright text-center md:text-left">
							{title}
						</h1>
					)}

					{subTitle && (
						<h2 className={`leading-tight font-bold mt-4 ${subTitleSize} text-neutral-softest drop-shadow-md tracking-wide text-center md:text-left`}>
							{subTitle}
						</h2>
					)}

					{description && (
						<div
							className="mt-6 text-lg text-gray-100 text-center md:text-left"
							dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
						/>
					)}

					{hasForm && (
						<div className="text-white mb-4">
							<ContactForm />
						</div>
					)}
				</div>

				{/* Right column (image) */}
				{imageUrl && (
					<div className={`z-[-1] opacity-60 md:opacity-100 ${colSpanRight} flex justify-center items-center`}>
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
