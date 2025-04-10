import { Routes, Route, HashRouter } from 'react-router-dom'
import CategoryList from '../src/components/CategoryList'
import ProductPage from '../src/pages/ProductPage'
import type { FC } from 'react'

const App: FC = () => {
  return (
    <HashRouter>
      <main className="bg-neutral-900  min-h-screen flex flex-col">
        <CategoryList />
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-neutral-600 text-3xl m-auto">
                Select category
              </h1>
            }
          />
          <Route path="/category/:categoryId" element={<ProductPage />} />
        </Routes>
      </main>
    </HashRouter>
  )
}

export default App
