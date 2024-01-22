import { gql } from "@apollo/client";

export const ADD_NOVEL = gql`
  mutation Mutation($image: String, $title: String) {
    addNovel(image: $image, title: $title) {
      id
      image
      title
      createdAt
      updatedAt
      authors {
        id
        name
        novelID
      }
    }
  }
`;
