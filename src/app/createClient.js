import ApolloClient from 'apollo-boost'
import withApollo from 'next-with-apollo'
import { getAPIBaseURL } from '../../config'

function createClient({ headers }) {
  return new ApolloClient({
    uri: `${getAPIBaseURL()}/graphql`,
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

export default withApollo(createClient, { getDataFromTree: 'ssr' })