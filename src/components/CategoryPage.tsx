import type { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import useProductQuery from '../composables/useProductQuery'

const CategoryPage: FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>()

  const { data, loading, error } = useProductQuery(categoryId) // TODO: handle error when categoryId is undefined

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
