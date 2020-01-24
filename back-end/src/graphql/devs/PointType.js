const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLFloat
} = require("graphql");

module.exports = new GraphQLObjectType({
  name: "LocationType",
  fields: {
    id: {
      type: GraphQLString
    },
    coordinates: {
      type: GraphQLList(GraphQLFloat)
    },
    type: {
      type: GraphQLString
    }
  }
});
