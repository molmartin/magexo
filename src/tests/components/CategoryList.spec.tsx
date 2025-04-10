import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import useCategoryQuery from '../../hooks/useCategoryQuery'
import {
  ApolloClient,
  ApolloError,
  ObservableQuery,
  OperationVariables,
} from '@apollo/client'
import CategoryList from '../../components/CategoryList'
import type { GetCategoriesData } from '../../hooks/categoryTypes'

// Mock the custom hook
vi.mock('../../hooks/useCategoryQuery')

const mockCategoryData = {
  collections: {
    edges: [
      {
        node: {
          id: 'gid://shopify/Collection/1',
          title: 'Category 1',
        },
      },
      {
        node: {
          id: 'gid://shopify/Collection/2',
          title: 'Category 2',
        },
      },
    ],
  },
}

describe('CategoryList', () => {
  const renderCategoryList = () => {
    return render(
      <MemoryRouter>
        <CategoryList />
      </MemoryRouter>,
    )
  }

  const baseMockReturnValue = {
    loading: true,
    error: undefined,
    data: undefined,
    client: {} as ApolloClient<object>,
    observable: {} as ObservableQuery<GetCategoriesData, OperationVariables>,
    networkStatus: 1,
    called: false,
    refetch: vi.fn(),
    fetchMore: vi.fn(),
    updateQuery: vi.fn(),
    startPolling: vi.fn(),
    stopPolling: vi.fn(),
    subscribeToMore: vi.fn(),
    reobserve: vi.fn(),
    variables: {},
  }

  it('should show loading state', () => {
    vi.mocked(useCategoryQuery).mockReturnValue(baseMockReturnValue)

    renderCategoryList()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should show error state', () => {
    vi.mocked(useCategoryQuery).mockReturnValue({
      ...baseMockReturnValue,
      loading: false,
      error: new ApolloError({
        errorMessage: 'Test error',
      }),
      data: undefined,
    })

    renderCategoryList()
    expect(screen.getByText('Error: Test error')).toBeInTheDocument()
  })

  it('should render categories', () => {
    vi.mocked(useCategoryQuery).mockReturnValue({
      ...baseMockReturnValue,
      loading: false,
      error: undefined,
      data: mockCategoryData,
    })

    renderCategoryList()

    expect(screen.getByText('MageXo')).toBeInTheDocument()
    expect(screen.getByText('Category 1')).toBeInTheDocument()
    expect(screen.getByText('Category 2')).toBeInTheDocument()
  })

  it('should render correct links', () => {
    vi.mocked(useCategoryQuery).mockReturnValue({
      ...baseMockReturnValue,
      loading: false,
      error: undefined,
      data: mockCategoryData,
    })

    renderCategoryList()

    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/category/1')
    expect(links[1]).toHaveAttribute('href', '/category/2')
  })
})
