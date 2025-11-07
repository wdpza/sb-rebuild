import { getCaseStudyBySlug } from "@/lib/data/case-studies"
import { notFound } from "next/navigation"
import CaseStudyItem from "@/components/case-study/CaseStudyItem"

export default async function Page({ params }: { params: Promise<{ slug: string }>}) {

    const { slug } = await params;
    const caseStudy = await getCaseStudyBySlug('case-study/' + slug)
    if (!caseStudy) return notFound()

    return (
        <main>
            <h1 className="sr-only">{caseStudy.title}</h1>
            <CaseStudyItem item={caseStudy} />
        </main>
    )
}