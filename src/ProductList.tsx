import { gql, useQuery } from '@apollo/client'

const GET_PRODUCTS = gql`
  query GetProductsWithCategories {
    products(first: 10) {
      edges {
        node {
          id
          title
          descriptionHtml
          handle
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
          collections(first: 3) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      }
    }
  }
`

// Typy pro odpověď z GraphQL API
type Product = {
  id: string
  title: string
  descriptionHtml: string
  handle: string
  variants: {
    edges: {
      node: {
        id: string
        title: string
        priceV2: {
          amount: string
          currencyCode: string
        }
      }
    }[]
  }
  collections: {
    edges: {
      node: {
        id: string
        title: string
      }
    }[]
  }
}

type ProductsResponse = {
  products: {
    edges: {
      node: Product
    }[]
  }
}

const ProductList = () => {
  const { loading, error, data } = useQuery<ProductsResponse>(GET_PRODUCTS)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h3>Product List</h3>
      <ul>
        {data?.products.edges.map(({ node }) => (
          <li key={node.id}>
            <h4>{node.title}</h4>
            <p>{node.descriptionHtml}</p>
            <h5>Variants:</h5>
            <ul>
              {node.variants.edges.map(({ node: variant }) => (
                <li key={variant.id}>
                  {variant.title} - {variant.priceV2.amount}{' '}
                  {variant.priceV2.currencyCode}
                </li>
              ))}
            </ul>
            <h5>Categories:</h5>
            <ul>
              {node.collections.edges.map(({ node: collection }) => (
                <li key={collection.id}>{collection.title}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
