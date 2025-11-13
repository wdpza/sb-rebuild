import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_DOMAINS = gql`
  query DomainsOptions {
    domainsOptions {
      pageFieldGroup {
        fieldGroupName
      }
      domainsOptionsFields {
        domain {
          price
          renewal
          tld
          transfer
        }
      }
    }
  }
`;

export async function getDomains() {
  try {
    const data: any = await client.request(GET_DOMAINS);

    return data.domainsOptions ?? null;
  } catch (error) {
    console.error("Error fetching primary menu:", error);
    return { menu: null, logo: null };
  }
}
