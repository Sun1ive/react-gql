const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

const PORT = 4000;

app.use('/graphql', graphqlHTTP({}), async (req, res) => {});

/* eslint-disable no-console */
app.listen(PORT, () => console.log('Server is running at', PORT));
