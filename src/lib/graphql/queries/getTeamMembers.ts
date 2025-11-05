import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_TEAM_MEMBERS = gql`
    query AllTeamMembers {
        teamMembers(
            first: 100
            where: { orderby: { field: DATE, order: ASC } }
        ) {
            nodes {
            slug
            title
            content
            teamMemberFields {
                profileNormal {
                node {
                    altText
                    mediaItemUrl
                }
                }
                profileHover {
                node {
                    altText
                    mediaItemUrl
                }
                }
            }
            teamMemberId
            }
        }
    }
`;

export async function getTeamMembers() {
    try {
        const data: any = await client.request(GET_TEAM_MEMBERS);

        return data.teamMembers.nodes || [];
    } catch (error) {
        console.error("Error fetching team members:", error);
        return [];
    }
}
