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

type Collection = {
  id: string
  title: string
  descriptionHtml: string
  products: {
    edges: { node: Product }[]
  }
}

type GetCategoryData = {
  collection: Collection
}
// TODO ocistit od nepotrebnych
function useProductQuery(categoryId: string | undefined) {
  if (!categoryId) {
    throw new Error('categoryId is required')
  }
  const GET_PRODUCTS_BY_CATEGORY = gql`
    query GetProductsByCategory($categoryId: ID!, $first: Int!) {
      collection(id: $categoryId) {
        id
        title
        products(first: $first) {
          edges {
            node {
              id
              title
              descriptionHtml
              variants(first: $first) {
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
        }
      }
    }
  `

  const variables = {
    categoryId: `gid://shopify/Collection/${categoryId}`,
    first: 5, // Default value, can be parameterized
  }

  return useQuery<GetCategoryData>(GET_PRODUCTS_BY_CATEGORY, { variables })

  /* return useQuery<GetCategoryData>(GET_PRODUCTS_BY_CATEGORY, {
    variables: { categoryId: `gid://shopify/Collection/${categoryId}` },
  }) */
}

export default useProductQuery
export type { GetCategoryData, Collection, Product, Variant, PriceV2 }
