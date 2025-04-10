import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../../components/Button'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('Button Component', () => {
  const mockOnClick = vi.fn()

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the button with the provided text', () => {
    render(<Button text="Click Me" onClick={mockOnClick} />)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('calls the onClick handler when clicked', () => {
    render(<Button text="Click Me" onClick={mockOnClick} />)
    fireEvent.click(screen.getByText('Click Me'))
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('applies the provided className', () => {
    render(
      <Button text="Click Me" onClick={mockOnClick} className="custom-class" />,
    )
    const button = screen.getByText('Click Me')
    expect(button).toHaveClass('custom-class')
  })

  it('is disabled when the disabled prop is true', () => {
    render(<Button text="Click Me" onClick={mockOnClick} disabled />)
    const button = screen.getByText('Click Me')
    expect(button).toBeDisabled()
  })

  it('does not call onClick when disabled', () => {
    render(<Button text="Click Me" onClick={mockOnClick} disabled />)
    fireEvent.click(screen.getByText('Click Me'))
    expect(mockOnClick).not.toHaveBeenCalled()
  })
})
