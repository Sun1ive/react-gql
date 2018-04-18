import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} from 'graphql';
import rnd from 'rand-token';

import { Book, Author } from '../models';

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: root => Author.findById(root.authorId),
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: root => Book.findAll({ where: { authorId: root.id } }),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve: () => Book.findAll(),
    },
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve: (root, args) => Book.findById(args.id),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => Author.findAll(),
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve: (root, args) => Author.findById(args.id),
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: (root, args) =>
        Author.create({
          name: args.name,
          age: args.age,
          id: rnd.generate(33),
        }),
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        genre: {
          type: new GraphQLNonNull(GraphQLString),
        },
        authorId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (root, args) =>
        Book.create({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        }),
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});
