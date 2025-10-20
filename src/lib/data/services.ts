import { client } from "@/lib/graphql/client"
import { GET_SERVICE_BY_SLUG } from "@/lib/graphql/queries/getServiceBySlug"

export async function getServiceBySlug(slug: string) {
  const data: any = await client.request(GET_SERVICE_BY_SLUG, { slug })
  return data.page
}