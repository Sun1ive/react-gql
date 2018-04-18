import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;

const BookList = props => {
  let books = 'Book';
  if (props.data.books) {
    books = props.data.books.map(x => <li key={x.id}>{x.name}</li>);
  }
  return (
    <div>
      <ul id="bookList">{books}</ul>
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
