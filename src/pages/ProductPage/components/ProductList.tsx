import { FC, memo } from 'react'
import ProductCard from './ProductCard'
import { Product } from '../../../hooks/productTypes'

const ProductList: FC<{ products: { node: Product }[]; className: string }> =
  memo(({ products, className }) => {
    return (
      <div
        className={`grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 ${className}`}
      >
        {products.map(({ node: product }) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )
  })

export default ProductList
