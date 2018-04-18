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

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
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
      args: { id: { type: GraphQLID } },
      resolve: (root, args) => books.find(book => book.id === args.id),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => authors,
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (root, args) => authors.find(author => author.id === args.id),
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
