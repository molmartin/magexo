import type { FC } from 'react'
import { PageInfo } from '../hooks/productTypes'
import Button from './Button'

type Props = {
  pageInfo: PageInfo
  className: string
  onNextPage: () => void
  onPreviousPage: () => void
}

const Pagination: FC<Props> = ({
  pageInfo,
  onNextPage,
  onPreviousPage,
  className,
}) => {
  return (
    <nav className={`flex justify-center gap-4 mt-8 ${className}`}>
      <Button
        text="Prev"
        onClick={onPreviousPage}
        disabled={!pageInfo.hasPreviousPage}
        className="bg-gray-200 hover:bg-gray-300"
      />

      <Button
        text="Next"
        onClick={onNextPage}
        disabled={!pageInfo.hasNextPage}
        className="bg-yellow-400 text-neutral-900 hover:bg-yellow-300"
      />
    </nav>
  )
}

export default Pagination
export type { Props as PaginationProps }
