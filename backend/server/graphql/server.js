const fs = require('fs');
const express = require('express');
const apicache = require('apicache');
const compression = require('compression');
const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { requestRoot, PORT_GRAPHQL_SERVER } = require('./../../../config');

// Create 'Express' server
const app = express();

const cache = apicache.middleware;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(compression());
app.use(cors());
app.use(cache('10 minutes'));

// Import 'typeDefs'
const typeDefs = gql(fs.readFileSync('server/graphql/typeDefs.gql', { encoding: 'utf8' }));
// Import 'resolvers'
const resolvers = require('./resolvers');
// Create 'GraphQL' server
const apolloServer = new ApolloServer({ typeDefs, resolvers });
// Run 'GraphQL' server
apolloServer.applyMiddleware({ app, path: '/graphql' });

// Initialize 'Express' server
app.listen({ port: PORT_GRAPHQL_SERVER }, () => {
  console.log(`Express listening for 'graphql' on ${requestRoot('graphql')} 🚀`);
});
