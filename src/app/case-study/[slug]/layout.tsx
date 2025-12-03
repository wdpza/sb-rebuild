// app/case-study/[slug]/layout.tsx
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug } from "@/lib/data/case-studies";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudySidebar from "@/components/case-study/CaseStudySidebar";
import { getCaseStudyItems } from "@/lib/graphql/queries/getCaseStudyItems";
import CaseStudiesMore from "@/components/case-study/CaseStudiesMore";

type CaseStudyItem = {
	title: string;
	slug: string;
	caseStudies?: {
		headerLogo?: { node?: { altText?: string; mediaItemUrl: string } } | null;
		headerImage?: { node?: { altText?: string; mediaItemUrl: string } } | null;
	};
	terms?: { nodes?: { name: string; id: string }[] };
};

export default async function CaseStudyLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const caseStudy = await getCaseStudyBySlug('article/case-study/' + slug);
	const items: CaseStudyItem[] = await getCaseStudyItems(10);
	if (!caseStudy) return notFound();

	return (
		<div className="article-layout flex flex-col w-full bg-[#161616]">
			<CaseStudyHero item={caseStudy} />

			<div className="w-full bg-center bg-[url(/bg.svg)]">
				<div className="grid w-full layout-wrapper mx-auto grid-cols-1 lg:grid-cols-8 gap-6 px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
					<div className="lg:col-span-2">
						<CaseStudySidebar item={caseStudy} />
					</div>
					<div className="lg:col-span-6">
						{children}
					</div>
				</div>
			</div>

			<CaseStudiesMore items={items} current={caseStudy} />
		</div>
	);
}