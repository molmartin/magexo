import type { FC } from 'react'
import { PageInfo } from '../hooks/productTypes'

type PaginationProps = {
  pageInfo: PageInfo
  onNextPage: () => void
  onPreviousPage: () => void
}

const Pagination: FC<PaginationProps> = ({
  pageInfo,
  onNextPage,
  onPreviousPage,
}) => {
  return (
    <nav className="flex gap-2 mt-4">
      <button disabled={!pageInfo.hasPreviousPage} onClick={onPreviousPage}>
        Prev
      </button>
      <button disabled={!pageInfo.hasNextPage} onClick={onNextPage}>
        Next
      </button>
    </nav>
  )
}

export default Pagination
export type { PaginationProps }
