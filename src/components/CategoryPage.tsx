import { useMemo, type FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import useProductQuery from '../hooks/useProductQuery'
import ProductCard from './ProductCard'

const CategoryPage: FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>()

  const { data, loading, error } = useProductQuery(categoryId) // TODO: handle error when categoryId is undefined
  // TODO proverit, mozna  zbytecne
  const products = useMemo(
    () => data?.collection.products.edges,
    [data?.collection.products.edges],
  )

  if (loading) return <div>Loading...</div>
  if (error || !data) return <div>Error: {error?.message}</div>

  return (
    <section>
      <Link to={`/`}>Back</Link>
      <h2>{data?.collection.title}</h2>
      <h3>Products</h3>
      <div>
        {products?.map(({ node: product }) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default CategoryPage
