import { gql } from "@apollo/client";

export const GET_NOVELS = gql`
  query Novels {
    novels {
      id
      image
      createdAt
      updatedAt
      authors {
        id
        name
      }
    }
  }
`;
