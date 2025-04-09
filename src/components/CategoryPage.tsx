import type { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($categoryId: ID!) {
    collection(id: $categoryId) {
      id
      title
      descriptionHtml
      products(first: 10) {
        edges {
          node {
            id
            title
            descriptionHtml
            variants(first: 5) {
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

// Typy pro odpověď
interface PriceV2 {
  amount: string
  currencyCode: string
}

interface Variant {
  id: string
  title: string
  priceV2: PriceV2
}

interface Product {
  id: string
  title: string
  descriptionHtml: string
  variants: {
    edges: { node: Variant }[]
  }
}

interface Collection {
  id: string
  title: string
  descriptionHtml: string
  products: {
    edges: { node: Product }[]
  }
}

interface GetCategoryData {
  collection: Collection
}

const CategoryPage: FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>()
  console.log(categoryId)
  const { loading, error, data } = useQuery<GetCategoryData>(
    GET_PRODUCTS_BY_CATEGORY,
    {
      variables: { categoryId: `gid://shopify/Collection/${categoryId}` },
    },
  )

  if (loading) return <div>Loading...</div>
  if (error || !data) return <div>Error: {error?.message}</div>

  const { collection } = data

  return (
    <div>
      <Link to={`/`}>Back</Link>
      <h2>{collection.title}</h2>
      <h3>Products</h3>
      <ul>
        {collection.products.edges.map(({ node: product }) => (
          <li key={product.id}>
            <h4>{product.title}</h4>
            <ul>
              {product.variants.edges.map(({ node: variant }) => (
                <li key={variant.id}>
                  {variant.title} - {variant.priceV2.amount}{' '}
                  {variant.priceV2.currencyCode}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryPage
