import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      title
      content
      createdAt
      author {
        id
        username
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      createdAt
      author {
        id
        username
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      username
      createdAt
    }
  }
`;
