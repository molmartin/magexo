import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import ApolloClientProvider from './components/ApolloClientProvider'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloClientProvider>
      <App />
    </ApolloClientProvider>
  </StrictMode>,
)
