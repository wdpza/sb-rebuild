import DOMPurify from "isomorphic-dompurify";
import Forms from "../shared/Forms";
import Link from "next/link";
import ContactForm from "../shared/ContactForm";

async function getGravityForm(id: number) {
	if (!id) return null;

	const auth = Buffer.from(
		`${process.env.GF_API_KEY}:${process.env.GF_API_SECRET}`
	).toString("base64");

	const url = `${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/gf/v2/forms/${id}`;

	const res = await fetch(url, {
		cache: "no-store",
		headers: {
			Authorization: `Basic ${auth}`,
		},
	});

	if (!res.ok) {
		console.error("Gravity Forms fetch failed:", await res.text());
		return null;
	}

	return res.json();
}

export default async function HeroLayout({
	title,
	description,
	subTitle,
	background,
	image,
	ctaLink,
	showContactForm,
	forms
}: any) {
	const bgUrl = background?.node?.mediaItemUrl ?? null;
	const imageUrl = image?.node?.mediaItemUrl ?? null;

	const showForm = forms?.showForm === true;
	const formId = forms?.gravityFormId ?? null;
	const form = formId ? await getGravityForm(formId) : null;
	const hasForm = showContactForm?.includes("1")

	console.log("Hero form:", form);

	const sectionHeight = title ? "md:min-h-screen" : "md:h-[160px]";

	// Dynamic adjustments
	const colSpanLeft = showForm ? "col-span-12" : "col-span-13";
	const colSpanRight = showForm ? "col-span-12" : "col-span-11";
	const subTitleSize = showForm ? "font-normal text-[20px] lg:text-[24px]" : "hero-subtitle";
	const paddingY = showForm ? "py-32" : "py-24";

	return (
		<section
			className={`relative flex w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden ${sectionHeight}`}
			style={{
				backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
			}}
		>
			<div className={`relative z-10 grid layout-wrapper grid-cols-1 md:grid-cols-24 gap-2 ${paddingY} ${title ? "min-h-screen" : "h-[160px]"}`}>
				
				{/* Left column */}
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
									rounded-md shadow-md 
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
							<p className='text-lg font-light mt-6 mb-6 text-neutral-softest text-center md:text-left md:pr-12 mb-12'>Please fill out our contact form. Once you hit submit, our team will be in touch faster than you can say “strategy”.</p>
							<ContactForm />
						</div>
					)}
					
					{showForm && form && (
						<div className="text-neutral-softest mb-4">
							<p className="text-lg font-light mt-6 mb-6 text-neutral-softest text-center md:text-left md:pr-12 mb-12">
								Please fill out our contact form. Once you hit submit, our team will be in
								touch faster than you can say “strategy”.
							</p>

							<Forms form={form} formId={formId} />
						</div>
					)}
					
				</div>

				{/* Right column */}
				{imageUrl && (
					<div className={`z-[-1] opacity-60 md:opacity-100 ${colSpanRight} justify-center items-center hidden md:flex`}>
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
	);
}
