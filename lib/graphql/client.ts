import { GraphQLClient } from 'graphql-request'

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const strapiToken = process.env.STRAPI_API_TOKEN

if (!strapiUrl) {
  console.warn('[Strapi] NEXT_PUBLIC_STRAPI_URL is not set. Using default localhost.')
}

if (!strapiToken) {
  console.warn('[Strapi] STRAPI_API_TOKEN is not set. Public content queries only.')
}

export const strapiClient = new GraphQLClient(`${strapiUrl}/graphql`, {
  headers: strapiToken ? {
    Authorization: `Bearer ${strapiToken}`,
  } : {},
})

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  try {
    return await strapiClient.request<T>(query, variables)
  } catch (error) {
    console.error('[Strapi] GraphQL Error:', error)
    throw error
  }
}
