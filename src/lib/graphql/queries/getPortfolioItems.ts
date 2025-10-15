import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_PORTFOLIO_ITEMS = gql`
    query GetPortfolioItems($numberOfItems: Int) {
        portfolio(first: $numberOfItems) {
            nodes {
                title
                content
                slug
                featuredImage {
                    node {
                        altText
                        mediaItemUrl
                    }
                }
                portfolioFields {
                    logo {
                        node {
                            altText
                            mediaItemUrl
                        }
                    }
                    sliderImageMain {
                        node {
                            altText
                            mediaItemUrl
                        }
                    }
                    sliderImageSlide1 {
                        node {
                            mediaItemUrl
                        }
                    }
                    sliderImageSlide2 {
                        node {
                            altText
                            mediaItemUrl
                        }
                    }
                }
            }
        }
    }
`;

export async function getPortfolioItems(numberOfItems: number = 6) {
    try {
        const data: any = await client.request(GET_PORTFOLIO_ITEMS, {
            numberOfItems,
        });

        return data.portfolio?.nodes || [];
    } catch (error) {
        console.error("Error fetching portfolio items:", error);
        return [];
    }
}
