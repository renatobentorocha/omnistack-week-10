const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const schema = require("./schema");

const server = new ApolloServer({ schema, playground: true });

mongoose.connect("MONGO_URL", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = server;
