export interface RankMathSitemapNode {
  uri: string;
}

export interface RankMathContentType {
  customImageMetaKeys: string | null;
  isInSitemap: boolean;
  sitemapUrl: string | null;
  type: string;
  connectedContentNodes: {
    nodes: RankMathSitemapNode[];
  } | null;
}

export interface RankMathTaxonomy {
  hasEmptyTerms: boolean;
  isInSitemap: boolean;
  sitemapUrl: string | null;
  type: string;
}

export interface RankMathAuthor {
  excludedRoles: string[] | null;
  excludedUserDatabaseIds: number[] | null;
  sitemapUrl: string | null;
  connectedAuthors: {
    nodes: {
      id: string;
    }[];
  } | null;
}

export interface RankMathGeneralSettings {
  canPingSearchEngines: boolean;
  excludedPostDatabaseIds: number[] | null;
  excludedTermDatabaseIds: number[] | null;
  hasFeaturedImage: boolean;
  hasImages: boolean;
  linksPerSitemap: number;
}

export interface RankMathSitemap {
  author: RankMathAuthor | null;
  contentTypes: RankMathContentType[];
  general: RankMathGeneralSettings;
  sitemapIndexUrl: string;
  taxonomies: RankMathTaxonomy[];
}

export interface RankMathSitemapResponse {
  rankMathSettings: {
    sitemap: RankMathSitemap;
  };
}
