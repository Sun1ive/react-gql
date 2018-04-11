const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
const PORT = 4000;

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

/* eslint-disable no-console */
app.listen(PORT, () => console.log('Server is running at', PORT));
