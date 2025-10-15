export interface Page {
  id: number;
  Title: string;
  Slug: string;
  status: string;
  Name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Components: ComponentBlock[];
}

export type ComponentBlock =
  | HeroBlock
  | SliderBlock
  | TextBlock
  | ImageGridBlock
  | ServicesAccordionBlock
  | LogoSliderBlock
  | PortfolioSliderBlock
  | BusinessSolutionsBlock;

export interface HeroBlock {
  __component: "pages.hero";
  id: number;
  Title: string;
  SubTitle?: string;
  Description?: string;
  Background?: any;
  Image?: any;
}

export interface SliderBlock {
  __component: "pages.slider";
  id: number;
  Images: any[];
}

export interface TextBlock {
  __component: "pages.text-block";
  id: number;
  Body: string;
}

export interface ImageGridBlock {
  __component: "pages.image-grid";
  id: number;
  Images: any[];
}

export interface ServicesAccordionBlock {
  __component: "pages.services-accordion";
  id: number;
  Content: {
    id: number;
    Title: string;
    Description: string;
  }[];
}

export interface LogoSliderBlock {
  __component: "pages.logo-slider";
  id: number;
  Logo: LogoAsset[];
}

export interface PortfolioSliderBlock {
  __component: "pages.portfolio-slider";
  id: number;
  Title?: string;
  NumberOfItems?: number;
  portfolios?: PortfolioItem[];
}

export interface BusinessSolutionsBlock {
  __component: "pages.business-solutions";
  id: number;
  Title?: string;
  NumberOfItems?: number;
  businessSolutions?: BusinessSolutionItem[];
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  slug: string;
  logo: string | null;
  sliderImageMain: string | null;
  sliderImageSide1: string | null;
  sliderImageSide2: string | null;
}

export interface BusinessSolutionItem {
  id: number;
  title: string;
  description?: string;
  logo?: string | null;
}

export interface LogoAsset {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: any; // refine if needed
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}