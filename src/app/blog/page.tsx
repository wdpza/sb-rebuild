import { getPageBySlug } from "@/lib/data/pages"
import PageRenderer from "@/components/PageRenderer"
import { notFound } from "next/navigation"

export const revalidate = 60 // ISR

export default async function BlogPage({ params }: { params: Promise<{ slug: string }>}) {

    const { slug } = await params;
    const page = await getPageBySlug(slug)

    if (!page) return notFound()

    return (
        <main>
            <h1 className="sr-only">{page.title}</h1>
            <PageRenderer pageBuilder={page.pageFieldGroup?.pageBuilder} />
        </main>
    )
}