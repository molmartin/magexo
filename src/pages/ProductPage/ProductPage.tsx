import { useState, type FC } from 'react'
import { useParams } from 'react-router-dom'
import useProductQuery from '../../hooks/useProductQuery'
import Pagination from './components/Pagination'
import { GetCategoryData } from '../../hooks/productTypes'
import ProductList from './components/ProductList'

type Variables = {
  after: string | undefined
  first: number | undefined
  last: number | undefined
  before: string | undefined
}

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

const CategoryPage: FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>()
  const [afterCursor, setAfterCursor] = useState<string | null>(null)
  const [beforeCursor, setBeforeCursor] = useState<string | null>(null)

  const PRODUCTS_PER_PAGE = 3

  const { data, loading, error, fetchMore } = useProductQuery(
    categoryId,
    PRODUCTS_PER_PAGE,
    undefined,
    afterCursor ?? undefined,
    beforeCursor ?? undefined,
  )

  if (loading) return <div>Loading...</div>
  if (error || !data) return <div>Error: {error?.message}</div>

  const products = data.collection.products.edges
  const pageInfo = data.collection.products.pageInfo

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

  function handlePageChange(variables: Variables) {
    fetchMore({
      variables,
      updateQuery,
    })
    setAfterCursor(pageInfo.startCursor ? null : pageInfo.endCursor)
    setBeforeCursor(pageInfo.endCursor ? null : pageInfo.startCursor)
  }

  return (
    <section className="max-w-5xl md:mx-auto px-4 py-8">
      <ProductList products={products} className="mt-5" />
      <Pagination
        pageInfo={pageInfo}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        className="float-right"
      />
    </section>
  )
}

export default CategoryPage
