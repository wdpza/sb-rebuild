import { gql } from "graphql-request";
import { client } from "@/lib/graphql/client";

export const GET_SERVICES_FOR_FORM = gql`
    query GetServicesForForm {
        services(first: 100, where: { orderby: { field: TITLE, order: ASC } }) {
            nodes {
                slug
                servicePageFields {
                    leadtrekkerSourceId
                }
            }
        }
    }
`;

export interface ServiceOption {
    leadtrekker_source_id?: string;
    slug: string;
}

export async function getServicesForForm(): Promise<ServiceOption[]> {
    try {
        const data: any = await client.request(GET_SERVICES_FOR_FORM);
        
        const services = data.services?.nodes || [];
        
        // Map to a simpler structure
        return services.map((service: any) => ({
            slug: service.slug,
            leadtrekker_source_id: service.servicePageFields?.leadtrekkerSourceId || 'Other'
        }));
    } catch (error) {
        console.error("Error fetching services for form:", error);
        return [];
    }
}
