import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_PORTFOLIO_OPTIONS = gql`
    query getPortfolioOptions {
        portfolioOptions {
            pageFieldGroup {
                pageBuilder {
                    __typename
                    ... on PageFieldGroupPageBuilderHeroLayout {
                    description
                    subTitle
                    title
                    background {
                        node {
                        altText
                        mediaItemUrl
                        }
                    }
                    image {
                        node {
                        altText
                        mediaItemUrl
                        }
                    }
                    }
                    ... on PageFieldGroupPageBuilderLogoSliderLayout {
                    fieldGroupName
                    logo {
                        logo {
                        node {
                            altText
                            mediaItemUrl
                        }
                        }
                    }
                    }
                    ... on PageFieldGroupPageBuilderExitSectionLayout {
                    title
                    ctaLink {
                        target
                        title
                        url
                    }
                    backgroundImage {
                        node {
                        altText
                        mediaItemUrl
                        }
                    }
                    }
                    ... on PageFieldGroupPageBuilderPortfolioLayoutLayout {
                        perCategory
                        backgroundImage {
                            node {
                            altText
                            mediaItemUrl
                            }
                        }
                    }
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
    }
`;

export async function getPortfolioOptions() {
    try {
        const data: any = await client.request(
            GET_PORTFOLIO_OPTIONS
        );

        return data;

    } catch (error) {
        console.error("Error fetching primary menu:", error);
        return { menu: null, logo: null };
    }
}
