import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_CATEGORY_BY_SLUG = gql`
    query GetCategoryBySlug($slug: ID!, $first: Int = 10, $after: String) {
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
    }
`;

export async function getCategoryBySlug(
	slug: string,
	first: number = 10,
	after: string | null = null
) {
	try {
		const data: any = await client.request(GET_CATEGORY_BY_SLUG, { slug, first, after });
		return data.category ?? null;
	} catch (err) {
		console.error(`Error fetching category "${slug}":`, err);
		return null;
	}
}