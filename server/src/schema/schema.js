const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');
const rnd = require('rand-token');

const { Book, Author } = require('../models');

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return authors.find(author => author.id === parent.id);
        return Book.findAll(Author.findById(parent.authorId));
        // return console.log('---', Author.findById(parent.authorId));
      },
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
      resolve(parent, args) {
        // return books.filter(book => book.authorId === parent.id);
        return Promise.resolve(Book.findAll({ where: { authorId: parent.id } }));
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return books.find(book => book.id === args.id);
        return Promise.resolve(Book.findById(args.id));
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return authors.find(author => author.id === args.id);
        return Promise.resolve(Author.findById(args.id));
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Promise.resolve(Book.findAll());
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Promise.resolve(Author.findAll());
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        console.log('---', rnd.generate(16));
        const author = Author.create({
          name: args.name,
          age: args.age,
          id: rnd.generate(32),
        });
        return author;
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const book = Book.create({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
