import { client } from "@/lib/graphql/client"
import { GET_PAGE_BY_SLUG } from "@/lib/graphql/queries/getPageBySlug"

export async function getPageBySlug(slug: string) {
  const { page } = await client.request(GET_PAGE_BY_SLUG, { slug })
  return page
}