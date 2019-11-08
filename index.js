const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

const { PORT, DB } = require("./core/config");

import getUserId from "./src/utils/getUserId";

// Mongo Models
import Post from "./src/models/post";
import User from "./src/models/user";

import Mutation from "./src/resolvers/Mutation";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Query {
    users: [User]
    me: User!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    posts: [Post!]!
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
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

// Mongoose - MongoDB connection
mongoose
  .connect(DB, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("🗄  Connected to MongoDB"))
  .catch(error => console.log(error));

// The ApolloServer constructor requires two parameters; your schema
// definition and your set of resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      async me(parent, args, { User, req }, info) {
        const userId = getUserId(req);
        return await User.findOne({
          _id: userId
        }).lean();
      }
    },
    Mutation,
    Post: {
      async author(parent, args, { User }, info) {
        const { author } = parent;
        return await User.findOne({
          _id: author
        }).lean();
      }
    },
    User: {
      async posts(parent, args, { Post }, info) {
        const { _id } = parent;
        const posts = await Post.find({ author: _id }).lean();
        console.log(posts);
        return posts;
      }
    }
  },
  context: ({ req }) => {
    // get the user token from the headers
    // const token = req.headers.authorization || "";

    // console.log(token);
    // // try to retrieve a user with the token
    // const user = getUserId(token);
    // add the authenticated user to context
    return { Post, User, req };
  }
});

// The `listen` method launces a web server
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
