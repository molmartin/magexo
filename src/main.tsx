import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from '../docs/App'
import ApolloClientProvider from './components/ApolloClientProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloClientProvider>
      <App />
    </ApolloClientProvider>
  </StrictMode>,
)
