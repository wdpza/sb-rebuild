import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_ALL_SERVICES = gql`
    query GetAllServices($first: Int = 100) {
        services(first: $first) {
            nodes {
                slug
            }
        }
    }
`;

export async function getAllServices(first: number = 100) {
    try {
        const data: any = await client.request(GET_ALL_SERVICES, {
            first,
        });

        return data.services?.nodes || [];
    } catch (error) {
        console.error("Error fetching all services:", error);
        return [];
    }
}
