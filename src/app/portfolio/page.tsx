import { getPortfolioOptions } from "@/lib/data/portfolio"
import OptionsRenderer from "@/components/OptionsRenderer"
import { notFound } from "next/navigation"

export const revalidate = 60 // ISR

export default async function PortfolioPage() {

    const page = await getPortfolioOptions()

    if (!page) return notFound()

    return (
        <main>
            <h1 className="sr-only">Portfolio</h1>
            <OptionsRenderer
                pageBuilder={page.portfolioOptions?.pageFieldGroup?.pageBuilder}
                categories={page.portfolioCategories?.nodes}
            />
        </main>
    )
}