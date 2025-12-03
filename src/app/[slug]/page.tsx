import { getPageBySlug } from "@/lib/data/pages"
import PageRenderer from "@/components/PageRenderer"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

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

  return {
    title: `${page.title} | Starbright`,
    description: page.pageFieldGroup?.pageBuilder?.[0]?.description || page.pageFieldGroup?.pageBuilder?.[0]?.subTitle || 'Crafting Amazing Brands | Partner with Starbright',
    openGraph: {
      title: `${page.title} | Starbright`,
      description: page.pageFieldGroup?.pageBuilder?.[0]?.description || page.pageFieldGroup?.pageBuilder?.[0]?.subTitle || 'Crafting Amazing Brands',
      type: 'website',
    },
  }
}

export default async function Page({ params }: any) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) notFound()

  return (
    <main>
      <h1 className="sr-only">{page.title}</h1>
      <PageRenderer pageBuilder={page.pageFieldGroup?.pageBuilder} />
    </main>
  )
}

export async function generateStaticParams() {
  return [{ slug: "home" }]
}