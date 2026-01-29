import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_ALL_POSTS = gql`
    query GetAllPosts($first: Int = 10, $after: String) {
        blogOptions {
            blogOptionsFields {
                blogHero {
                    backgroundImage {
                        node {
                            altText
                            mediaItemUrl
                        }
                    }
                    title
                    subHeading
                    description
                    mainImage {
                        node {
                            altText
                            mediaItemUrl
                        }
                    }
                    anchor
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
        categories {
            nodes {
            name
            uri
            }
        }
        posts(first: $first, after: $after) {
            pageInfo {
            hasNextPage
            endCursor
            }
            nodes {
            id
            title
            slug
            date
            excerpt
            uri
            featuredImage {
                node {
                sourceUrl
                altText
                }
            }
            }
        }
    }
`;

export async function getAllPosts(first = 10, after?: string | null) {
    try {
        const data: any = await client.request(GET_ALL_POSTS, { first, after });

        return {
            posts: data?.posts || {
                nodes: [],
                pageInfo: { hasNextPage: false, endCursor: null },
            },
            blogOptions: data?.blogOptions || null,
            categories: data?.categories?.nodes || [],
        };
    } catch (err) {
        console.error("Error fetching posts:", err);
        return {
            posts: {
                nodes: [],
                pageInfo: { hasNextPage: false, endCursor: null },
            },
            blogOptions: null,
            categories: [],
        };
    }
}
