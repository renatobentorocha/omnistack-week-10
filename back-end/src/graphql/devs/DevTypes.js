const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");

const LocationType = require("./PointType");

module.exports = new GraphQLObjectType({
  name: "DevType",
  fields: {
    _id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    github_username: {
      type: GraphQLString
    },
    bio: {
      type: GraphQLString
    },
    avatar_url: {
      type: GraphQLString
    },
    techs: {
      type: GraphQLList(GraphQLString)
    },
    location: {
      type: LocationType
    }
  }
});
