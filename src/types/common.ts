/**
 * Common TypeScript types and interfaces for the application
 */

export interface MediaNode {
  altText?: string;
  mediaItemUrl?: string;
  mediaDetails?: {
    file?: string;
    filePath?: string;
  };
}

export interface MediaItem {
  node?: MediaNode;
}

export interface CtaLink {
  url: string;
  title: string;
  target?: string;
}

export interface BackgroundImage {
  node?: {
    altText?: string;
    mediaItemUrl?: string;
    filePath?: string;
  };
}

export interface FormFields {
  showForm?: boolean;
  fieldGroupName?: string;
  gravityFormId?: string;
}

export interface HeroLayoutProps {
  title?: string;
  description?: string;
  subTitle?: string;
  background?: MediaItem;
  image?: MediaItem;
  ctaLink?: CtaLink;
  showContactForm?: string[];
  forms?: FormFields;
}

export interface ExitLayoutProps {
  title?: string;
  backgroundImage?: MediaItem;
  ctaLink?: CtaLink;
  backgroundOverlay?: boolean;
}

export interface PageBuilderBlock {
  __typename: string;
  [key: string]: any;
}

export interface PageRendererProps {
  pageBuilder?: PageBuilderBlock[];
}

export interface PortfolioFields {
  logo?: MediaItem;
  sliderImageMain?: MediaItem;
  sliderImageSlide1?: MediaItem;
  sliderImageSlide2?: MediaItem;
}

export interface Portfolio {
  slug: string;
  title: string;
  portfolioFields?: PortfolioFields;
}

export interface PostCategory {
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  featuredImage?: MediaItem;
  categories?: {
    nodes: PostCategory[];
  };
}

export interface CaseStudy {
  slug: string;
  title: string;
  excerpt?: string;
  featuredImage?: MediaItem;
}

export interface TeamMember {
  name: string;
  position?: string;
  image?: MediaItem;
  bio?: string;
}

export interface Certificate {
  title: string;
  description?: string;
  logo?: MediaItem;
}

export interface EmployeePhoto {
  mediaItemUrl: string;
  altText?: string | null;
  title?: string | null;
}

export interface EmployeeCarouselLayoutProps {
  title?: string;
  description?: string;
  employeePhotos?: { nodes: EmployeePhoto[] };
  visible?: 5 | 7 | 9;
  backgroundImage?: MediaItem;
}
