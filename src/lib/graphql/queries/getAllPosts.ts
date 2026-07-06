import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_ALL_POSTS = gql`
    query GetAllPosts($first: Int, $after: String, $last: Int, $before: String) {
        readingSettings {
            postsPerPage
        }
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
        posts(first: $first, after: $after, last: $last, before: $before) {
            pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
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

export async function getAllPosts(options?: {
    first?: number | null;
    after?: string | null;
    last?: number | null;
    before?: string | null;
}) {
    const { first, after, last, before } = options ?? {};
    try {
        const data: any = await client.request(GET_ALL_POSTS, { first, after, last, before });
        const postsPerPage: number = data?.readingSettings?.postsPerPage ?? 10;

        return {
            posts: data?.posts || {
                nodes: [],
                pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null },
            },
            blogOptions: data?.blogOptions || null,
            categories: data?.categories?.nodes || [],
            postsPerPage,
        };
    } catch (err) {
        console.error("Error fetching posts:", err);
        return {
            posts: {
                nodes: [],
                pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null },
            },
            blogOptions: null,
            categories: [],
            postsPerPage: 10,
        };
    }
}
