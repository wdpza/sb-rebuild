import { gql } from "graphql-request";

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
                    }
                }
            }
        }
    }
`;
