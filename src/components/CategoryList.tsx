import type { FC } from 'react'
import { Link } from 'react-router-dom'
import useCategoryQuery from '../hooks/useCategoryQuery'

const CategoryList: FC = () => {
  const { loading, error, data } = useCategoryQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <section className="flex gap-3 p-3">
      <h3>MageXo</h3>
      {data?.collections.edges.map((edge) => {
        const { id, title } = edge.node
        const shortId = id.split('/').pop()
        return (
          <div key={id}>
            <Link to={`/category/${shortId}`}>{title}</Link>
          </div>
        )
      })}
    </section>
  )
}

export default CategoryList
