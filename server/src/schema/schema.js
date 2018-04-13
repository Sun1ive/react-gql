const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema
} = require('graphql');

const books = [
  { name: 'Hello', genre: 'Sci-Fi', id: '1', authorId: '1' },
  { name: 'World', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'There', genre: 'Life', id: '3', authorId: '3' },
  { name: 'Hello', genre: 'Sci-Fi', id: '1', authorId: '1' },
  { name: 'World', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'There', genre: 'Life', id: '3', authorId: '3' },
  { name: 'Hello', genre: 'Sci-Fi', id: '1', authorId: '1' },
  { name: 'World', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'There', genre: 'Life', id: '3', authorId: '3' },
];
const authors = [
  { name: 'Alex', age: 33, id: '1' },
  { name: 'Anna', age: 55, id: '2' },
  { name: 'John', age: 22, id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return authors.find(author => author.id === parent.id);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return books.find(book => book.id === args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.find(author => author.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
