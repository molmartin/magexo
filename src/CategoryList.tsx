import { useQuery, gql } from '@apollo/client'

// GraphQL dotaz pro kategorie
const GET_CATEGORIES = gql`
  query GetCategories {
    collections(first: 10) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`
// Typy pro odpověď z GraphQL API
type Category = {
  id: string
  title: string
}

type GetCategoriesData = {
  collections: {
    edges: {
      node: Category
    }[]
  }
}
const CategoryList = () => {
  const { loading, error, data } = useQuery<GetCategoriesData>(GET_CATEGORIES)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h3>Categories</h3>
      <ul>
        {data?.collections.edges.map(({ node }) => (
          <li key={node.id}>
            {node.title} - {node.id}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList
