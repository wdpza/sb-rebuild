import { getAllTermsAndConditions } from "@/lib/graphql/queries/getAllTermsAndConditions";
import { notFound } from "next/navigation"
import TermsConditionsHero from "@/components/terms-conditions/TermsConditionsHero"
import TermsConditionsContent from "@/components/terms-conditions/TermsConditionsContent"
import TermsConditionsExit from "@/components/terms-conditions/TermsConditionsExit"

export default async function TermsAndConditionsPage() {

    const page = await getAllTermsAndConditions(20)

    if (!page) return notFound()

    return (
        <main>
            <TermsConditionsHero options={page} />
            <TermsConditionsContent options={page} />
            <TermsConditionsExit options={page} />
        </main>
    )
}