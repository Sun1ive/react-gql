import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export { getAuthorsQuery, getBooksQuery };
