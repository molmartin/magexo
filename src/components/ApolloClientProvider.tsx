import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { ReactNode } from 'react'

const client = new ApolloClient({
  uri: 'https://magexo-interview.myshopify.com/api/2024-04/graphql',
  headers: {
    'X-Shopify-Storefront-Access-Token': '4a7580803918255b7e93ee661ff2cead',
  },
  cache: new InMemoryCache(),
})

const ApolloClientProvider = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloClientProvider
