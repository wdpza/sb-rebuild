import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_ALL_POSTS = gql`
    query GetAllPosts($first: Int, $after: String, $last: Int, $before: String, $search: String, $order: OrderEnum = DESC) {
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
            slug
            uri
            }
        }
        posts(first: $first, after: $after, last: $last, before: $before, where: { search: $search, orderby: { field: DATE, order: $order } }) {
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

export const GET_POST_PAGINATION = gql`
    query GetPostPagination($search: String, $order: OrderEnum = DESC) {
        posts(first: 1000, where: { search: $search, orderby: { field: DATE, order: $order } }) {
            edges {
                cursor
            }
        }
    }
`;

export async function getPostPagination(search?: string | null, order: "ASC" | "DESC" = "DESC") {
    try {
        const data: any = await client.request(GET_POST_PAGINATION, { search, order });
        return (data?.posts?.edges ?? []).map((edge: { cursor: string }) => edge.cursor);
    } catch (err) {
        console.error("Error fetching post pagination:", err);
        return [];
    }
}

export async function getAllPosts(options?: {
    first?: number | null;
    after?: string | null;
    last?: number | null;
    before?: string | null;
    search?: string | null;
    order?: "ASC" | "DESC";
}) {
    const { first, after, last, before, search, order = "DESC" } = options ?? {};
    try {
        const data: any = await client.request(GET_ALL_POSTS, { first, after, last, before, search, order });
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
