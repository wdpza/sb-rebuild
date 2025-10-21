import { getPortfolioItems } from "@/lib/graphql/queries/getPortfolioItems";
import PortfolioSlider from "@/components/portfolio/PortfolioSlider"

export default async function PortfolioSliderLayout({
    numberOfItems = 6,
    backgroundImage
}: {
    numberOfItems?: number;
    backgroundImage?: any;
}) {
    const items = await getPortfolioItems(numberOfItems);

    return <PortfolioSlider items={items} backgroundImage={backgroundImage} title="Our Work" />;
}
