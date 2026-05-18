import Image from "next/image";
import Link from "next/link";

type CaseStudyItem = {
	title: string;
	slug: string;
	caseStudies?: {
		headerLogo?: { node?: { altText?: string; mediaItemUrl: string } } | null;
		headerImage?: { node?: { altText?: string; mediaItemUrl: string } } | null;
		cardBg?: any;
		service?: { nodes?: { id: string; title: string; uri: string }[] };
	};
	terms?: { nodes?: { name: string; id: string }[] };
};

export default function CaseStudiesCard({ item }: { item: CaseStudyItem }) {
	const logoUrl =
		item.caseStudies?.headerLogo?.node?.mediaItemUrl ??
		item.caseStudies?.headerImage?.node?.mediaItemUrl;

	const logoAlt =
		item.caseStudies?.headerLogo?.node?.altText ||
		item.caseStudies?.headerImage?.node?.altText ||
		`${item.title} logo`;

	const categories =
		item.terms?.nodes?.map((n) => n.name).join(" | ") ||
		"Uncategorised";

	const services = item.caseStudies?.service?.nodes || [];

	const baseUrl = process.env.NEXT_PUBLIC_WP_BASE_URL;
	
	const bg = item.caseStudies?.cardBg?.node?.filePath
		? `${baseUrl}${item.caseStudies?.cardBg?.node?.filePath}`
		: null;

	return (
		<article
			className="relative flex min-h-[500px] border border-neutral-strong flex-col items-center justify-center rounded-2xl bg-[#1D1D1D] p-8 shadow-lg transition hover:shadow-lg"
			style={{
				backgroundImage: bg ? `url(${bg})` : undefined,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			{/* Grayscale Backdrop Filter Overlay */}
			<div className="absolute inset-0 z-0 rounded-2xl bg-neutral-strongest/90 backdrop-grayscale" />

			{/* Logo */}
			<div className="z-10">
				<div className="mb-6 flex items-center justify-center h-20">
					{logoUrl ? (
						<Image
							src={logoUrl}
							alt={logoAlt}
							width={220}
							height={80}
							className="h-auto w-auto max-h-20 object-contain"
						/>
					) : (
						<div className="flex h-20 w-52 items-center justify-center rounded-lg bg-white/5 text-neutral-softest/60">
							<span className="px-2 text-sm">{item.title}</span>
						</div>
					)}
				</div>

				{/* Display linked services, otherwise fall back to categories */}
				<p className="mb-8 text-sm font-medium tracking-wide text-neutral-softest text-balance">
					{services.length > 0
						? services.map((s, i) => (
								<span key={s.id}>
									<Link href={s.uri} className="hover:underline">
										{s.title}
									</Link>
									{i < services.length - 1 && " | "}
								</span>
							))
						: categories}
				</p>

				{/* Button */}
				<Link
					href={`/case-study/${item.slug}`}
					aria-label={`View case study: ${item.title}`}
					className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-neutral-softest gradient-border mt-0"
					scroll={true}
				>
					View Case Study
				</Link>
			</div>
			<div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
		</article>
	);
}
