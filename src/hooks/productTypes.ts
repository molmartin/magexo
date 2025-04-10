type PriceV2 = {
  amount: string
  currencyCode: string
}

type Variant = {
  id: string
  title: string
  priceV2: PriceV2
}

type ProductImage = {
  url: string
  altText: string | null
  width: number
  height: number
}

type Product = {
  id: string
  title: string
  images: {
    edges: {
      node: ProductImage
    }[]
  }
  variants: {
    edges: { node: Variant }[]
  }
}

type PageInfo = {
  hasPreviousPage: boolean
  hasNextPage: boolean
  startCursor: string | null
  endCursor: string | null
}

type Collection = {
  id: string
  title: string
  products: {
    edges: { node: Product }[]
    pageInfo: PageInfo
  }
}

type GetCategoryData = {
  collection: Collection
}

export type { GetCategoryData, Collection, Product, Variant, PriceV2, PageInfo }
