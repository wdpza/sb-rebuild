import { client } from "@/lib/graphql/client"
import { GET_CASE_STUDY_BY_SLUG } from "@/lib/graphql/queries/getCaseStudyBySlug"

export async function getCaseStudyBySlug(slug: string) {
  const data: any = await client.request(GET_CASE_STUDY_BY_SLUG, { slug })
  return data.caseStudy
}