const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const db = require('./models');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

db.sequelize
  // .sync({ force: true })
  .sync()
  .then(() =>
    app.listen(config.port, () => console.log('DB is sync and server is running at', config.port)),
  )
  .catch(e => console.log(e));
