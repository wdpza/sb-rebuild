import { getCaseStudyItems } from "@/lib/graphql/queries/getCaseStudyItems";
import CaseStudiesCard from "@/components/case-study/CaseStudiesCard";

type CaseStudyItem = {
	title: string;
	slug: string;
	caseStudies?: {
		headerLogo?: { node?: { altText?: string; mediaItemUrl: string } } | null;
		headerImage?: { node?: { altText?: string; mediaItemUrl: string } } | null;
		cardBg?: any;
	};
	terms?: { nodes?: { name: string; id: string }[] };
};

export default async function CaseStudiesLayout({
	numberOfItems,
	title,
}: {
	numberOfItems?: number;
	title?: string;
}) {
	const items: CaseStudyItem[] = await getCaseStudyItems(numberOfItems);

	return (
		<div id="case-studies" className="w-full bg-[#28262C]">
			<div className={`layout-wrapper py-12`}>

				{/* 4 columns on large screens, graceful fallbacks below */}
				<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
					{items?.map((item) => (
						<CaseStudiesCard key={item.slug} item={item} />
					))}
				</section>
			</div>
		</div>
	);
}