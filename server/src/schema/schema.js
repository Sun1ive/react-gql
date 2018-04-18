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

import { books, authors } from '../data';

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
    book: {
      type: BookType,
      args: { id: { type: GraphQLInt } },
      resolve: (root, args) => books.find(book => book.id === args.id),
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
