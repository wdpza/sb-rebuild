import DOMPurify from 'isomorphic-dompurify'
import ContactForm from "@/components/shared/ContactForm"
import Link from "next/link"

export default function HeroLayout({ title, description, subTitle, background, image, ctaLink, showContactForm }: any) {
	const bgUrl = background?.node?.mediaItemUrl ?? null
	const imageUrl = image?.node?.mediaItemUrl ?? null
	const hasForm = showContactForm?.includes("1")
	const sectionHeight = title ? "md:min-h-screen" : "md:h-[160px]"

	// Dynamic adjustments
	const colSpanLeft = hasForm ? "col-span-12" : "col-span-13"
	const colSpanRight = hasForm ? "col-span-12" : "col-span-11"
	const subTitleSize = hasForm ? "font-normal text-[20px] lg:text-[24px]" : "hero-subtitle"
	const paddingY = hasForm ? "py-32" : "py-24"

	return (
		<section
			className={`relative flex w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden ${sectionHeight}`}
			style={{
				backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
			}}
		>
			<div className={`relative z-10 grid layout-wrapper grid-cols-1 md:grid-cols-24 gap-2 ${paddingY} ${title ? "min-h-screen" : "h-[160px]"}`}>
				
				{/* Left column (text + form) */}
				<div className={`${colSpanLeft} flex flex-col justify-center text-left gap-8 md:gap-4 mt-12 z-4`}>
					{title && (
						<h1 className="font-archivo uppercase hero-title font-black drop-shadow-lg text-gradient-starbright text-center md:text-left text-balance">
							{title}
						</h1>
					)}

					{subTitle && (
						<h2 className={`leading-tight mt-4 ${subTitleSize} text-neutral-softest drop-shadow-md tracking-wide text-center md:text-left`}>
							{subTitle}
						</h2>
					)}

					{description && (
						<div
							className="hero-description mt-6 mb-6 text-neutral-softest text-center md:text-left"
							dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
						/>
					)}

					{ctaLink && (
						<div className="mt-8 flex justify-center md:justify-start">
							<Link
								href={ctaLink.url}
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

					{hasForm && (
						<div className="text-neutral-softest mb-4">
							<ContactForm />
						</div>
					)}
				</div>

				{/* Right column (image) */}
				{imageUrl && (
					<div className={`z-[-1] opacity-60 md:opacity-100 ${colSpanRight} justify-center items-center hidden md:flex`}>
						<img
							src={imageUrl}
							alt={title ?? ""}
							className="absolute max-h-[100vh] object-contain"
							style={{ bottom: "2px" }}
						/>
					</div>
				)}
			</div>
		</section>
	)
}
