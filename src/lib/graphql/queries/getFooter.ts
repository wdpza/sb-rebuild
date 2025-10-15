import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_FOOTER = gql`
    query GetFooter {
        siteOptions {
            siteOptionsFields {
                siteLogo {
                    node {
                        altText
                        mediaItemUrl
                    }
                }
                footer {
                    address
                    officeNumber
                    whatsappNumber
                }
            }
        }
    }
`;

export async function getFooter() {
    try {
        const data: any = await client.request(
            GET_FOOTER
        );

        return {
            footer: data.siteOptions?.siteOptionsFields?.footer ?? null,
            logo: data.siteOptions?.siteOptionsFields?.siteLogo?.node ?? null,
        };
    } catch (error) {
        console.error("Error fetching primary menu:", error);
        return { menu: null, logo: null };
    }
}
