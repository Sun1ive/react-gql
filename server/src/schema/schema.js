import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} from 'graphql';
import rnd from 'rand-token';

import { Book, Author } from '../models';

const books = [
  {
    name: 'Wind of the wind',
    genre: 'Fantasy',
    id: 1,
  },
  {
    name: 'Call of the wild',
    genre: 'Fantasy',
    id: 2,
  },
  {
    name: 'Savage roar',
    genre: 'SciFi',
    id: 3,
  },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve: () => books,
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
