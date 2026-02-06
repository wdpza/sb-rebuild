import { gql } from "graphql-request";
import { client } from "../client";
import { RankMathSitemapResponse, RankMathSitemap } from "@/types/sitemap";

export const FETCH_RANK_MATH_SITEMAP = gql`
    query FetchRankMathSitemap {
        rankMathSettings {
            sitemap {
                author {
                    excludedRoles
                    excludedUserDatabaseIds
                    sitemapUrl
                    connectedAuthors {
                        nodes {
                            id
                        }
                    }
                }
                contentTypes {
                    customImageMetaKeys
                    isInSitemap
                    sitemapUrl
                    type
                    connectedContentNodes {
                        nodes {
                            uri
                        }
                    }
                }
                general {
                    canPingSearchEngines
                    excludedPostDatabaseIds
                    excludedTermDatabaseIds
                    hasFeaturedImage
                    hasImages
                    linksPerSitemap
                }
                sitemapIndexUrl
                taxonomies {
                    hasEmptyTerms
                    isInSitemap
                    sitemapUrl
                    type
                }
            }
        }
    }
`;

export async function fetchRankMathSitemap(): Promise<RankMathSitemap> {
    const data = await client.request<RankMathSitemapResponse>(FETCH_RANK_MATH_SITEMAP);
    return data.rankMathSettings.sitemap;
}
