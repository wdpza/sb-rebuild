import { MetadataRoute } from 'next';
import { fetchRankMathSitemap } from '@/lib/graphql/queries/getRankMathSitemap';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapData = await fetchRankMathSitemap();
  const baseUrl = 'https://starbright.co.za';

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Process content types (posts, pages, services, etc.)
  if (sitemapData?.contentTypes) {
    for (const contentType of sitemapData.contentTypes) {
      if (contentType.isInSitemap && contentType.connectedContentNodes?.nodes) {
        for (const node of contentType.connectedContentNodes.nodes) {
          if (node.uri) {
            sitemapEntries.push({
              url: `${baseUrl}${node.uri}`,
              lastModified: new Date(),
              changeFrequency: getChangeFrequency(contentType.type),
              priority: getPriority(contentType.type, node.uri),
            });
          }
        }
      }
    }
  }

  // Add homepage explicitly if not already included
  const hasHomepage = sitemapEntries.some(entry => 
    entry.url === baseUrl || entry.url === `${baseUrl}/` || entry.url === `${baseUrl}/home/`
  );
  
  if (!hasHomepage) {
    sitemapEntries.unshift({
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    });
  }

  return sitemapEntries;
}

// Helper function to determine change frequency based on content type
function getChangeFrequency(contentType: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  switch (contentType) {
    case 'POST':
      return 'weekly';
    case 'PAGE':
      return 'monthly';
    case 'SERVICE':
    case 'BUSINESS_SOLUTION':
      return 'monthly';
    case 'CASE_STUDY':
    case 'PORTFOLIO_ITEM':
      return 'monthly';
    case 'TEAM_MEMBER':
      return 'yearly';
    case 'TERM_CONDITION':
      return 'yearly';
    default:
      return 'monthly';
  }
}

// Helper function to determine priority based on content type and URI
function getPriority(contentType: string, uri: string): number {
  // Homepage gets highest priority
  if (uri === '/' || uri === '/home/' || uri === '/home') {
    return 1.0;
  }

  // Key pages get high priority
  if (uri === '/contact/' || uri === '/about/' || uri === '/services/') {
    return 0.9;
  }

  // Content type based priorities
  switch (contentType) {
    case 'PAGE':
      return 0.8;
    case 'SERVICE':
    case 'BUSINESS_SOLUTION':
      return 0.8;
    case 'CASE_STUDY':
    case 'PORTFOLIO_ITEM':
      return 0.7;
    case 'POST':
      return 0.6;
    case 'TEAM_MEMBER':
      return 0.5;
    case 'TERM_CONDITION':
      return 0.4;
    default:
      return 0.5;
  }
}
