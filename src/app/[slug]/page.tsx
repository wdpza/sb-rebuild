import { getPageBySlug } from "@/lib/data/pages"
import PageRenderer from "@/components/PageRenderer"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getServicesForForm } from "@/lib/graphql/queries/getServicesForForm"

// Remove force-dynamic to allow static generation where possible
// export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour instead of every minute

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  const seo = page.seo

  return {
    title: seo?.title || `${page.title} | Starbright`,
    description: seo?.description || page.pageFieldGroup?.pageBuilder?.[0]?.description || page.pageFieldGroup?.pageBuilder?.[0]?.subTitle || 'Crafting Amazing Brands | Partner with Starbright',
    keywords: seo?.focusKeywords,
    alternates: {
      canonical: seo?.canonicalUrl,
    },
    robots: seo?.robots ? seo.robots.join(', ') : undefined,
    openGraph: {
      title: seo?.openGraph?.title || `${page.title} | Starbright`,
      description: seo?.openGraph?.description || page.pageFieldGroup?.pageBuilder?.[0]?.description || page.pageFieldGroup?.pageBuilder?.[0]?.subTitle || 'Crafting Amazing Brands',
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
  }
}

export default async function Page({ params }: any) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) notFound()

  // Fetch services for contact page form
  const services = slug === 'contact' ? await getServicesForForm() : []

  return (
    <main>
      <PageRenderer 
        pageBuilder={page.pageFieldGroup?.pageBuilder} 
        services={services}
      />
    </main>
  )
}

export async function generateStaticParams() {
  return [{ slug: "home" }]
}