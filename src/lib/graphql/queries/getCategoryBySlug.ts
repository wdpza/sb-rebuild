import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_CATEGORY_BY_SLUG = gql`
    query GetCategoryBySlug($slug: ID!, $first: Int = 10, $after: String, $search: String, $order: OrderEnum = DESC) {
        category(id: $slug, idType: SLUG) {
            id
            name
            description
            slug
            uri
            parent {
                node {
                    id
                    name
                    slug
                    uri
                    parent {
                        node {
                            id
                            name
                            slug
                            uri
                            parent {
                                node {
                                    id
                                    name
                                    slug
                                    uri
                                }
                            }
                        }
                    }
                }
            }
            posts(first: $first, after: $after, where: { search: $search, orderby: { field: DATE, order: $order } }) {
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
    }
`;

export const GET_CATEGORY_POST_PAGINATION = gql`
    query GetCategoryPostPagination($slug: ID!, $search: String, $order: OrderEnum = DESC) {
        category(id: $slug, idType: SLUG) {
            posts(first: 1000, where: { search: $search, orderby: { field: DATE, order: $order } }) {
                edges {
                    cursor
                }
            }
        }
    }
`;

export async function getCategoryPostPagination(slug: string, search?: string | null, order: "ASC" | "DESC" = "DESC") {
	try {
		const data: any = await client.request(GET_CATEGORY_POST_PAGINATION, { slug, search, order });
		return (data?.category?.posts?.edges ?? []).map((edge: { cursor: string }) => edge.cursor);
	} catch (err) {
		console.error(`Error fetching pagination for category "${slug}":`, err);
		return [];
	}
}

export async function getCategoryBySlug(
	slug: string,
	first: number = 10,
	after: string | null = null,
	search: string | null = null,
	order: "ASC" | "DESC" = "DESC"
) {
	try {
		const data: any = await client.request(GET_CATEGORY_BY_SLUG, { slug, first, after, search, order });
		return data.category ?? null;
	} catch (err) {
		console.error(`Error fetching category "${slug}":`, err);
		return null;
	}
}
