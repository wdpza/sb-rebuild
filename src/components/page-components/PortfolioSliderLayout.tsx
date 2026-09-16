import { getPortfolioItems } from "@/lib/graphql/queries/getPortfolioItems";
import PortfolioSlider from "@/components/portfolio/PortfolioSlider"

interface PortfolioItem {
  title: string;
  slug: string;
  portfolioFields: {
    sliderImageMain?: {
      node: {
        mediaItemUrl?: string | null;
        altText?: string | null;
      };
    } | null;
    relatedCaseStudy?: {
      nodes?: Array<{
        title: string;
        slug: string;
        caseStudyCategories?: {
          nodes?: Array<{ name: string; slug: string }>;
        } | null;
      }>;
    } | null;
  };
}

export default async function PortfolioSliderLayout({
    numberOfItems = 6,
    backgroundImage
}: {
    numberOfItems?: number;
    backgroundImage?: any;
}) {
    const items = await getPortfolioItems(Math.max(numberOfItems * 4, 24));

    const filteredItems = items
      .filter((item: PortfolioItem) => (
        item.portfolioFields?.sliderImageMain?.node?.mediaItemUrl &&
        item.portfolioFields?.relatedCaseStudy?.nodes?.[0]
      ))
      .slice(0, numberOfItems);

    return <PortfolioSlider items={filteredItems} backgroundImage={backgroundImage} title="Our Latest Work" />;
}
