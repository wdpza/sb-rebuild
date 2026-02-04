import { getPortfolioItems } from "@/lib/graphql/queries/getPortfolioItems";
import PortfolioSlider from "@/components/portfolio/PortfolioSlider"

interface PortfolioItem {
  portfolioFields: {
    logo: {
      node: {
        mediaItemUrl?: string | null;
      };
    };
    sliderImageMain: {
      node: {
        mediaItemUrl?: string | null;
      };
    };
    sliderImageSlide1: {
      node: {
        mediaItemUrl?: string | null;
      };
    };
    sliderImageSlide2: {
      node: {
        mediaItemUrl?: string | null;
      };
    };
  };
}

export default async function PortfolioSliderLayout({
    numberOfItems = 6,
    backgroundImage
}: {
    numberOfItems?: number;
    backgroundImage?: any;
}) {
    const items = await getPortfolioItems(numberOfItems);

    const filteredItems = items.filter((item: PortfolioItem) => {
        return (
            item.portfolioFields.logo?.node?.mediaItemUrl &&
            item.portfolioFields.sliderImageMain?.node?.mediaItemUrl &&
            item.portfolioFields.sliderImageSlide1?.node?.mediaItemUrl &&
            item.portfolioFields.sliderImageSlide2?.node?.mediaItemUrl
        );
    });

    return <PortfolioSlider items={filteredItems} backgroundImage={backgroundImage} title="View Our Work" />;
}