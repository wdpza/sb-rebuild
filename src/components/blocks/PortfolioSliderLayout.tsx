import { getPortfolioItems } from "@/lib/graphql/queries/getPortfolioItems";
import PortfolioSlider from "@/components/portfolio/PortfolioSlider"

export default async function PortfolioSliderLayout({
    numberOfItems = 6,
}: {
    numberOfItems?: number;
}) {
    const items = await getPortfolioItems(numberOfItems);

    return <PortfolioSlider items={items} title="Our Work" />;
}
