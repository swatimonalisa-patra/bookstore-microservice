const { gql } = require("apollo-server-express");

module.exports = gql`
  type Author {
    id: ID!
    name: String!
    bio: String
    books: [Book]
  }

  type Book {
    id: ID!
    title: String!
    genre: String
    publishedYear: Int
    author: Author
  }

  type User {
    id: ID!
    email: String!
    token: String
  }

  type Query {
    books: [Book]
    authors: [Author]
    booksByGenre(genre: String!): [Book]
    booksByAuthor(authorId: ID!): [Book]
  }

  type Mutation {
    signup(email: String!, password: String!): User
    login(email: String!, password: String!): User
    addBook(title: String!, genre: String, publishedYear: Int, authorId: ID!): Book
    updateBook(id: ID!, title: String, genre: String, publishedYear: Int): Book
    deleteBook(id: ID!): String
    addAuthor(name: String!, bio: String): Author
    updateAuthor(id: ID!, name: String, bio: String): Author
  }
`;
