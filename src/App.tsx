import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CategoryList from './components/CategoryList'
import CategoryPage from './components/CategoryPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoryList />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
      </Routes>
    </Router>
  )
}

export default App
