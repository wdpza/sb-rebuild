import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_ALL_PORTFOLIO_ITEMS = gql`
    query GetAllPortfolioItems($numberOfItems: Int) {
        portfolioOptions {
            portfolioOptionsFields {
            portfolioHero {
                anchor
                backgroundImage {
                node {
                    altText
                    mediaItemUrl
                }
                }
                description
                mainImage {
                node {
                    altText
                    mediaItemUrl
                }
                }
                title
                subHeading
            }
            exitSection {
                backgroundImage {
                node {
                    altText
                    mediaItemUrl
                }
                }
                ctaLink {
                target
                title
                url
                }
                title
            }
            }
        }
        portfolioCategories {
            nodes {
            databaseId
            name
            slug
            }
        }
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

export async function getAllPortfolioItems() {
    try {
        const data: any = await client.request(
            GET_ALL_PORTFOLIO_ITEMS
        );

        return data;

    } catch (error) {
        console.error("Error fetching primary menu:", error);
        return { menu: null, logo: null };
    }
}
