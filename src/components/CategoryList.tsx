import type { FC } from 'react'
import useCategoryQuery from '../hooks/useCategoryQuery'
import { NavLink } from 'react-router-dom'

const CategoryList: FC = () => {
  const { loading, error, data } = useCategoryQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <nav className="flex gap-3  border-neutral-800 border-b items-center justify-between sm:justify-start">
      <h1 className="px-4 sm:inline hidden text-yellow-500 text-xl font-bold">
        MageXo
      </h1>
      {data?.collections.edges.map((edge) => {
        const { id, title } = edge.node
        const shortId = id.split('/').pop()
        return (
          <NavLink
            to={`/category/${shortId}`}
            key={id}
            className={({ isActive }: { isActive: boolean }) =>
              `p-5 transition-all duration-300 ease-in-out ${isActive ? 'text-yellow-500' : 'text-neutral-400 hover:text-yellow-500'}`
            }
          >
            {title}
          </NavLink>
        )
      })}
    </nav>
  )
}

export default CategoryList
