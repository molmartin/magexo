import { FC, memo } from 'react'

type Props = {
  text: string
  onClick: () => void
  className?: string
  disabled?: boolean
}

const Button: FC<Props> = memo(({ text, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded disabled:opacity-50 disabled:bg-neutral-600 disabled:text-white cursor-pointer ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  )
})

export default Button
