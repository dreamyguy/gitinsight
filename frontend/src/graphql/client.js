import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { requestRoot } from '../config';

const client = new ApolloClient({
  link: new HttpLink({ uri: requestRoot('graphql') }),
  cache: new InMemoryCache(),
  // Use 'no-cache' to avoid caching, 'cache-first' is default
  defaultOptions: { query: { fetchPolicy: 'no-cache' } },
});

export default client;
