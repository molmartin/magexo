import { useState, type FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import useProductQuery, { GetCategoryData } from '../hooks/useProductQuery'
import ProductCard from './ProductCard'
import Pagination from './Pagination'
import { Product } from '../hooks/useProductQuery'

const PRODUCTS_PER_PAGE = 3

const CategoryPage: FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>()
  const [afterCursor, setAfterCursor] = useState<string | null>(null)
  const [beforeCursor, setBeforeCursor] = useState<string | null>(null)

  const { data, loading, error, fetchMore } = useProductQuery(
    categoryId,
    PRODUCTS_PER_PAGE,
    undefined,
    afterCursor ?? undefined,
    beforeCursor ?? undefined,
  )

  if (loading) return <div>Loading...</div>
  if (error || !data) return <div>Error: {error?.message}</div>

  function updateQuery(
    previousResult: GetCategoryData,
    { fetchMoreResult }: { fetchMoreResult: GetCategoryData | null },
  ) {
    if (!fetchMoreResult) return previousResult
    return {
      collection: {
        ...fetchMoreResult.collection,
        products: fetchMoreResult.collection.products,
      },
    }
  }

  const products = data.collection.products.edges
  const pageInfo = data.collection.products.pageInfo

  type Variables = {
    after: string | undefined
    first: number | undefined
    last: number | undefined
    before: string | undefined
  }

  function handlePageChange(variables: Variables) {
    fetchMore({
      variables,
      updateQuery,
    })
    setAfterCursor(pageInfo.startCursor ? null : pageInfo.endCursor)
    setBeforeCursor(pageInfo.endCursor ? null : pageInfo.startCursor)
  }
  function handleNextPage() {
    handlePageChange({
      after: pageInfo.endCursor ?? undefined,
      first: PRODUCTS_PER_PAGE,
      last: undefined,
      before: undefined,
    })
  }

  function handlePreviousPage() {
    handlePageChange({
      after: undefined,
      first: undefined,
      last: PRODUCTS_PER_PAGE,
      before: pageInfo.startCursor ?? undefined,
    })
  }

  return (
    <section>
      <Link to={`/`}>Back</Link>
      <h2>{data.collection.title}</h2>
      <h3>Products</h3>
      <div>
        {products.map(({ node: product }: { node: Product }) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        pageInfo={pageInfo}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
    </section>
  )
}

export default CategoryPage
