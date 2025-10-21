import { getBusinessSolutions } from "@/lib/graphql/queries/getBusinessSolutions";
import BusinessSolution from "../business-solutions/BusinessSolution";

export default async function BusinessSolutionsLayout({
    numberOfItems = 4,
}: {
    numberOfItems?: number;
}) {
    const items = await getBusinessSolutions(numberOfItems);

    return <BusinessSolution items={items} title="Business Solutions" />;
}
