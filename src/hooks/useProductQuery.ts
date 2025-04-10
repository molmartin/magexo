import { gql, useQuery } from '@apollo/client'
import { GetCategoryData } from './productTypes'

function useProductQuery(
  categoryId: string | undefined,
  first?: number,
  last?: number,
  after?: string,
  before?: string,
) {
  if (!categoryId) {
    throw new Error('categoryId is required')
  }

  const GET_PRODUCTS_BY_CATEGORY = gql`
    query GetProductsByCategory(
      $categoryId: ID!
      $first: Int
      $last: Int
      $after: String
      $before: String
    ) {
      collection(id: $categoryId) {
        id
        title
        products(first: $first, last: $last, after: $after, before: $before) {
          edges {
            node {
              id
              title
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                    width
                    height
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          pageInfo {
            hasPreviousPage
            hasNextPage
            startCursor
            endCursor
          }
        }
      }
    }
  `

  const variables = {
    categoryId: `gid://shopify/Collection/${categoryId}`,
    first,
    last,
    after,
    before,
  }

  return useQuery<GetCategoryData>(GET_PRODUCTS_BY_CATEGORY, { variables })
}

export default useProductQuery
