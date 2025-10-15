import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_PRIMARY_MENU = gql`
    query GetPrimaryMenu {
        menu(id: "primary", idType: LOCATION) {
            id
            name
            slug
            menuItems(first: 100) {
                nodes {
                    id
                    label
                    url
                    target
                    cssClasses
                    parentId
                    order
                    connectedObject {
                        ... on Page {
                            id
                            slug
                            title
                        }
                        ... on Post {
                            id
                            slug
                            title
                        }
                        ... on Category {
                            id
                            slug
                            name
                        }
                    }
                }
            }
        }
        siteOptions {
            siteOptionsFields {
            siteLogo {
                node {
                altText
                mediaItemUrl
                srcSet
                }
            }
            }
        }
    }
`;

export interface PrimaryMenuResponse {
    menu: any;
    siteOptions: any;
}

export async function getPrimaryMenu() {
    try {
        const data = await client.request<PrimaryMenuResponse>(GET_PRIMARY_MENU);

        return {
            menu: data.menu,
            logo: data.siteOptions?.siteOptionsFields?.siteLogo?.node ?? null,
        };
    } catch (error) {
        console.error("Error fetching primary menu:", error);
        return { menu: null, logo: null };
    }
}