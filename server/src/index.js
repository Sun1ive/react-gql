import express from 'express';
import graphqlHTTP from 'express-graphql';
import morgan from 'morgan';
import cors from 'cors';
import schema from './schema/schema';
import config from './config';
import db from './models';

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
