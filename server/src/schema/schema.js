const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema
} = require('graphql');

const books = [
  { name: 'Hello', genre: 'Sci-Fi', id: '1' },
  { name: 'World', genre: 'Fantasy', id: '2' },
  { name: 'There', genre: 'Life', id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        console.log('---', typeof args === 'object');
        return books.find(book => book.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
