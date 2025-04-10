import type { FC } from 'react'
import { Link } from 'react-router-dom'
import useCategoryQuery from '../hooks/useCategoryQuery'

const CategoryList: FC = () => {
  const { loading, error, data } = useCategoryQuery()

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
