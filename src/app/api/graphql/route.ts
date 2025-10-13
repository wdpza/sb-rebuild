import { GraphQLClient } from 'graphql-request'

export const client = new GraphQLClient(process.env.WORDPRESS_GRAPHQL_URL!, {
  headers: { 'Content-Type': 'application/json' },
})