import { gql, useQuery } from '@apollo/client'
import { GetCategoriesData } from './categoryTypes'

const GET_CATEGORIES = gql`
  query GetCategories {
    collections(first: 10) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`

function useCategoryQuery() {
  return useQuery<GetCategoriesData>(GET_CATEGORIES)
}

export default useCategoryQuery
