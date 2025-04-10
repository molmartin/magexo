import { FC, memo } from 'react'
import { Product } from '../../../hooks/productTypes'

const ProductImage: FC<{ product: Product }> = memo(({ product }) => {
  if (!product.images.edges.length) {
    return (
      <i className="border-t border-x border-neutral-800 rounded-sm- w-[200px] h-[200px] bg-neutral-900 mx-auto text-neutral-600 flex items-center justify-center">
        No image
      </i>
    )
  }
  return (
    <div className="aspect-square w-full ms:w-[200px] mx-aut">
      <img
        loading="lazy"
        src={product.images.edges[0].node.url}
        alt={product.title}
        width="200"
        className="w-full h-full object-cover"
      />
    </div>
  )
})

const ProductCard: FC<{ product: Product }> = memo(({ product }) => {
  return (
    <div className="bg-neutral-800 rounded-md overflow-hidden transition duration-200 max-w-full md:max-w-[200px] pb-2">
      <ProductImage product={product} />
      <div className="px-2">
        <h3 className="text-xs font-semibold my-2 text-wrap text-neutral-200 h-8 ">
          {product.title}
        </h3>
        <ul className="text-sm space-y-1">
          {/* <!-- Display the first variant of the product --> */}
          {product.variants.edges.slice(0, 1).map(({ node: variant }) => (
            <li key={variant.id} className="flex justify-between gap-2">
              <span className="text-neutral-400">{variant.title}</span>
              <span className="font-medium text-green-400">
                {variant.priceV2.amount} {variant.priceV2.currencyCode}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})
export default ProductCard
