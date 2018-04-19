import React from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries';

const BookList = props => {
  let books = 'Books is loading...';
  if (props.data.books) {
    books = props.data.books.map(book => <li key={book.id}>{book.name}</li>);
  }
  return (
    <div>
      <ul id="bookList">{books}</ul>
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
