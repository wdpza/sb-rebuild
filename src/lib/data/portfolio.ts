import { client } from "@/lib/graphql/client"
import { GET_PORTFOLIO_OPTIONS } from "@/lib/graphql/queries/getPortfolioOptions"
import { GET_PORTFOLIO_BY_CATEGORY_SLUG } from "@/lib/graphql/queries/getPortfolioByCategorySlug"

export async function getPortfolioOptions() {
  const data: any = await client.request(GET_PORTFOLIO_OPTIONS)
  return data
}

export async function getPortfolioByCategorySlug(slug: string) {
  const data: any = await client.request(GET_PORTFOLIO_BY_CATEGORY_SLUG, { slug })
  return data
}