type Category = {
  id: string
  title: string
}

type GetCategoriesData = {
  collections: {
    edges: {
      node: Category
    }[]
  }
}

export type { GetCategoriesData, Category }
