import { gql } from "graphql-request";
import { client } from "../client";
import { 
  RankMathRedirection,
  RankMathRedirectionsResponse,
} from "@/types/common";

export const FETCH_RANK_MATH_REDIRECTIONS = gql`
  query FetchRankMathRedirections {
    redirections {
      nodes {
        databaseId
        dateCreated
        dateCreatedGmt
        dateLastAccessed
        dateLastAccessedGmt
        dateModified
        dateModifiedGmt
        hits
        id
        redirectToUrl
        sources {
          comparison
          ignore
          pattern
        }
        status
        type
      }
    }
  }
`;

export async function fetchRankMathRedirections(): Promise<RankMathRedirection[]> {
  const data = await client.request<RankMathRedirectionsResponse>(
    FETCH_RANK_MATH_REDIRECTIONS
  );
  return data.redirections.nodes;
}
