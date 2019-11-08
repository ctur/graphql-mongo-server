const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

const { PORT, DB } = require("./core/config");

import getUserId from "./src/utils/getUserId";

// Mongo Models
import Book from "./src/models/post";
import User from "./src/models/user";

import Mutation from "./src/resolvers/Mutation";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    updatedAt: String!
    createdAt: String!
  }

  type Post {
    _id: ID!
    title: String!
    body: String!
    author: User!
    updatedAt: String!
    createdAt: String!
  }

  type Mutation {
    login(data: LoginUserInput!): AuthPayload!
    createUser(data: CreateUserInput!): AuthPayload!
    createPost(data: CreatePostInput!): Post!
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

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
// const resolvers = {
//   Query: {
//     books: () => books
//   }
// };

mongoose
  .connect(DB, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("DB connected"))
  .catch(error => console.log(error));

// The ApolloServer constructor requires two parameters; your schema
// definition and your set of resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Mutation
  },
  context: ({ req }) => {
    // get the user token from the headers
    // const token = req.headers.authorization || "";

    // console.log(token);
    // // try to retrieve a user with the token
    // const user = getUserId(token);
    // add the authenticated user to context
    return { Book, User, req };
  }
});

// The `listen` method launces a web server
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
