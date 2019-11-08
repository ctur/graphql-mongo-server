const bookSchema = require("./bookSchema");
import userSchema from "./userSchema";
const { gql } = require("apollo-server");

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, bookSchema];
