import ApolloClient from 'apollo-boost'
import withApollo from 'next-with-apollo'

function createClient({ headers }) {
  return new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers: { cookie: headers && headers.cookie }
      })
    }
  })
}

export default withApollo(createClient)