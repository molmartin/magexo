import { gql, useQuery } from '@apollo/client'

type PriceV2 = {
  amount: string
  currencyCode: string
}

type Variant = {
  id: string
  title: string
  priceV2: PriceV2
}

type Product = {
  id: string
  title: string
  descriptionHtml: string
  variants: {
    edges: { node: Variant }[]
  }
}

type PageInfo = {
  hasPreviousPage: boolean
  hasNextPage: boolean
  startCursor: string | null
  endCursor: string | null
}

type Collection = {
  id: string
  title: string
  descriptionHtml: string
  products: {
    edges: { node: Product }[]
    pageInfo: PageInfo
  }
}

type GetCategoryData = {
  collection: Collection
}

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
              descriptionHtml
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
export type { GetCategoryData, Collection, Product, Variant, PriceV2, PageInfo }
