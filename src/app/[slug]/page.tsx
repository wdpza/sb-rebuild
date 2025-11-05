import { getPageBySlug } from "@/lib/data/pages"
import PageRenderer from "@/components/PageRenderer"
import { notFound } from "next/navigation"

export const revalidate = 60

export default async function Page({ params }: any) {
  const { slug } = params
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