import { FC, memo } from 'react'
import { Product } from '../hooks/productTypes'

const ProductCard: FC<{ product: Product }> = memo(({ product }) => {
  return (
    <div>
      <h4 className="text-xl">{product.title}</h4>
      {!!product.images.edges.length && (
        <img
          loading="lazy"
          src={product.images.edges[0].node.url}
          alt={product.title}
          width="200"
        />
      )}
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
