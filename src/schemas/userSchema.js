const { gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export default gql`
  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    name: String!
    email: String!
    password: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  extend type Query {
    books: [Book]
  }

  extend type Mutation {
    login(data: LoginUserInput!): AuthPayload!
    createUser(data: CreateUserInput!): AuthPayload!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input AuthPayload {
    token: String!
    user: User!
  }
`;
