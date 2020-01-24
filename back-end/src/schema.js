const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const rootQuery = require("./graphql/rootQuery");
const rootMutation = require("./graphql/rootMutation");
const rootSubscription = require("./graphql/rootSubscription");

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      ...rootQuery
    }
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutationType",
    fields: {
      ...rootMutation
    }
  }),
  subscription: new GraphQLObjectType({
    name: "RootSubscriptioType",
    fields: {
      ...rootSubscription
    }
  })
});
