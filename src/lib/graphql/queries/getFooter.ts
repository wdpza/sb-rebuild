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
                socialMedia {
                url
                icon {
                    node {
                    altText
                    mediaItemUrl
                    }
                }
                }
            }
            }
        }
        otherLinks: menu(id: "Other Links", idType: NAME) {
            id
            name
            slug
            menuItems {
            nodes {
                id
                label
                uri
                url
                target
                parentId
                order
                cssClasses
                connectedObject {
                ... on Page {
                    id
                    title
                    slug
                }
                ... on Post {
                    id
                    title
                    slug
                }
                }
            }
            }
        }
        policiesMenu: menu(id: "Policies Menu", idType: NAME) {
            id
            name
            slug
            menuItems {
            nodes {
                id
                label
                uri
                url
                target
                parentId
                order
                cssClasses
                connectedObject {
                ... on Page {
                    id
                    title
                    slug
                }
                ... on Post {
                    id
                    title
                    slug
                }
                }
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

        return data;
    } catch (error) {
        console.error("Error fetching primary menu:", error);
        return { menu: null, logo: null };
    }
}
