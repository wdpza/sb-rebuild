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
  params: { slug: string };
}) {
  const caseStudy = await getCaseStudyBySlug(params.slug);
  const items: CaseStudyItem[] = await getCaseStudyItems(10);
  if (!caseStudy) return notFound();

  return (
      <div className="article-layout flex flex-col w-full bg-[#161616]">
        <CaseStudyHero item={caseStudy} />
        <div className="grid w-full max-w-[1600px] mx-auto grid-cols-8 gap-6 px-12 py-16">
          <div className="col-span-2">
            <CaseStudySidebar item={caseStudy} />
          </div>
          <div className="col-span-6">{children}</div>
        </div>
        <CaseStudiesMore items={items} current={caseStudy} />
      </div>    
  );
}
