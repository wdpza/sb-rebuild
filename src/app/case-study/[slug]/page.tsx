import { getCaseStudyBySlug } from "@/lib/data/case-studies"
import { notFound } from "next/navigation"
import CaseStudyItem from "@/components/case-study/CaseStudyItem"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const caseStudy = await getCaseStudyBySlug('case-study/' + slug);

    if (!caseStudy) {
        return {
            title: 'Case Study Not Found',
        };
    }

    const seo = caseStudy.seo;

    return {
        title: seo?.title || `${caseStudy.title} | Starbright`,
        description: seo?.description || caseStudy.caseStudies?.headerText || 'Starbright Case Study',
        keywords: seo?.focusKeywords,
        alternates: {
            canonical: seo?.canonicalUrl,
        },
        robots: seo?.robots ? seo.robots.join(', ') : undefined,
        openGraph: {
            title: seo?.openGraph?.title || `${caseStudy.title} | Starbright`,
            description: seo?.openGraph?.description || caseStudy.caseStudies?.headerText || 'Starbright Case Study',
            url: seo?.openGraph?.url,
            siteName: seo?.openGraph?.siteName || 'Starbright',
            locale: seo?.openGraph?.locale || 'en_US',
            type: (seo?.openGraph?.type as any) || 'article',
            images: seo?.openGraph?.image ? [{
                url: seo.openGraph.image.url,
                width: seo.openGraph.image.width || undefined,
                height: seo.openGraph.image.height || undefined,
                type: seo.openGraph.image.type || undefined,
            }] : undefined,
        },
        twitter: {
            card: (seo?.openGraph?.twitterMeta?.card as any) || 'summary_large_image',
            site: seo?.openGraph?.twitterMeta?.site,
            creator: seo?.openGraph?.twitterMeta?.creator,
            title: seo?.openGraph?.twitterMeta?.title || seo?.title || `${caseStudy.title} | Starbright`,
            description: seo?.openGraph?.twitterMeta?.description || seo?.description,
            images: seo?.openGraph?.twitterMeta?.image ? [seo.openGraph.twitterMeta.image] : undefined,
        },
    };
}

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