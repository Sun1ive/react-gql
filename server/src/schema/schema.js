const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');

const books = [
  { title: 'Hello', genre: 'Sci-Fi', id: '1' },
  { title: 'World', genre: 'Fantasy', id: '2' },
  { title: 'There', genre: 'Life', id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db / other source         
        return books.find(book => book.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
