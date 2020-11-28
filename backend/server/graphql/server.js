const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { requestRoot, PORT_GRAPHQL_SERVER } = require('./../../../config');
const schema = require('./schema');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(PORT_GRAPHQL_SERVER, () => {
  console.log(`Express listening for 'graphql' on ${requestRoot('graphql')} 🚀`);
});
