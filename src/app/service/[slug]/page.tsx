import { getServiceBySlug } from "@/lib/data/services"
import ServiceRenderer from "@/components/ServiceRenderer"
import { notFound } from "next/navigation"

export const revalidate = 60 // ISR

export default async function Page({ params }: { params: Promise<{ slug: string }>}) {

    const { slug } = await params;
    const page = await getServiceBySlug('article/service/' + slug);

    if (!page) return notFound()

    return (
        <main>
            <h1 className="sr-only">{page.title}</h1>
            <ServiceRenderer pageBuilder={page.servicePageFields?.servicePageBuilder} />
        </main>
    )
}

export async function generateStaticParams() {
    return [{ slug: "home" }]
}