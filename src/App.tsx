import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CategoryList from './components/CategoryList'
import CategoryPage from './components/CategoryPage'
import type { FC } from 'react'

const App: FC = () => {
  return (
    <Router>
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
          <Route path="/category/:categoryId" element={<CategoryPage />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
