import { FC, memo } from 'react'
import { Product } from '../hooks/useProductQuery'

const ProductCard: FC<{ product: Product }> = memo(({ product }) => {
  return (
    <div>
      <h4>{product.title}</h4>
      <ul>
        {product.variants.edges.map(({ node: variant }) => (
          <li key={variant.id}>
            {variant.title} - {variant.priceV2.amount}{' '}
            {variant.priceV2.currencyCode}
          </li>
        ))}
      </ul>
    </div>
  )
})
export default ProductCard
