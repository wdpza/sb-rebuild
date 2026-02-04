import { getServiceBySlug } from "@/lib/data/services"
import { getAllServices } from "@/lib/graphql/queries/getAllServices"
import ServiceRenderer from "@/components/ServiceRenderer"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// Revalidate every hour (3600 seconds)
export const revalidate = 3600;

export async function generateStaticParams() {
    const services = await getAllServices(100);
    return services.map((service: any) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const page = await getServiceBySlug('service/' + slug);

    if (!page) {
        return {
            title: 'Service Not Found',
        };
    }

    const seo = page.seo;

    return {
        title: seo?.title || `${page.title} | Starbright`,
        description: seo?.description || 'Starbright Services',
        keywords: seo?.focusKeywords,
        alternates: {
            canonical: seo?.canonicalUrl,
        },
        robots: seo?.robots ? seo.robots.join(', ') : undefined,
        openGraph: {
            title: seo?.openGraph?.title || `${page.title} | Starbright`,
            description: seo?.openGraph?.description || 'Starbright Services',
            url: seo?.openGraph?.url,
            siteName: seo?.openGraph?.siteName || 'Starbright',
            locale: seo?.openGraph?.locale || 'en_US',
            type: (seo?.openGraph?.type as any) || 'website',
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
            title: seo?.openGraph?.twitterMeta?.title || seo?.title || `${page.title} | Starbright`,
            description: seo?.openGraph?.twitterMeta?.description || seo?.description,
            images: seo?.openGraph?.twitterMeta?.image ? [seo.openGraph.twitterMeta.image] : undefined,
        },
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }>}) {

    const { slug } = await params;
    const page = await getServiceBySlug('service/' + slug);

    if (!page) return notFound()

    return (
        <main>
            <h1 className="sr-only">{page.title}</h1>
            <ServiceRenderer pageBuilder={page.servicePageFields?.servicePageBuilder} />
        </main>
    )
}