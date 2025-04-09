import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

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

const CategoryList: FC = () => {
  const { loading, error, data } = useQuery<GetCategoriesData>(GET_CATEGORIES)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h3>Categories</h3>
      <ul>
        {data?.collections.edges.map((edge) => {
          const { id, title } = edge.node
          const shortId = id.split('/').pop()
          return (
            <li key={id}>
              <Link to={`/category/${shortId}`}>{title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CategoryList
