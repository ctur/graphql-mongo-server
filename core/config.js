const { PORT = 4444 } = process.env;
const DB = "mongodb://localhost:27017/graphql-test";

module.exports = {
  DB,
  PORT,
  accessControlAllowOrigin: "*"
};
