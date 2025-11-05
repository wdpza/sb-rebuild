import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_PORTFOLIO_BY_CATEGORY_SLUG = gql`
    query GetPortfolioByCategorySlug($slug: ID!) {
        portfolioCategory(id: $slug, idType: URI) {
            portfolio {
                nodes {
                    portfolioFields {
                    sliderImageMain {
                        node {
                        altText
                        mediaItemUrl
                        }
                    }
                    sliderImageSlide1 {
                        node {
                        altText
                        mediaItemUrl
                        }
                    }
                    sliderImageSlide2 {
                        node {
                        altText
                        mediaItemUrl
                        }
                    }
                    logo {
                        node {
                        altText
                        mediaItemUrl
                        }
                    }
                    }
                    title
                }
            }
        }
    }
`;

export async function getPortfolioByCategorySlug(slug: string) {
    try {
        const data: any = await client.request(GET_PORTFOLIO_BY_CATEGORY_SLUG, {
            slug,
        });

        return data.portfolioCategory || [];
    } catch (error) {
        console.error("Error fetching portfolio items:", error);
        return [];
    }
}