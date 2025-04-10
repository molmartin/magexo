import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { FC, ReactNode } from 'react'

const client = new ApolloClient({
  uri: 'https://magexo-interview.myshopify.com/api/2024-04/graphql',
  headers: {
    'X-Shopify-Storefront-Access-Token':
      import.meta.env.VITE_APP_TOKEN ?? 'error-load-token',
  },
  cache: new InMemoryCache(), // TODO bettetr cache
})

const ApolloClientProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloClientProvider
