const { withFilter } = require("apollo-server");

const {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLFloat,
  GraphQLString
} = require("graphql");

const DevTypes = require("./DevTypes");
const resolver = require("./resolver");

const pubsub = require("../../services/PubSub");
const parseStringAsArray = require("../../utils/parseStringAsArray");
const calculateDistance = require("../../utils/calculateDistance");

const DEV_ADDED = require("../../constants/devs");

module.exports = {
  queries: {
    devs: {
      type: GraphQLList(DevTypes),
      resolve: resolver.getDevs
    },
    searchDevs: {
      type: GraphQLList(DevTypes),
      resolve: resolver.searchDevs,
      args: {
        input: {
          type: new GraphQLInputObjectType({
            name: "DevSearch",
            fields: {
              latitude: {
                type: GraphQLFloat
              },
              longitude: {
                type: GraphQLFloat
              },
              techs: {
                type: GraphQLString
              }
            }
          })
        }
      }
    }
  },
  mutations: {
    saveDev: {
      type: DevTypes,
      resolve: resolver.saveDev,
      args: {
        input: {
          type: new GraphQLInputObjectType({
            name: "DevInput",
            fields: {
              github_username: {
                type: GraphQLString
              },
              techs: {
                type: GraphQLString
              },
              latitude: {
                type: GraphQLFloat
              },
              longitude: {
                type: GraphQLFloat
              }
            }
          })
        }
      }
    }
  },
  subscriptions: {
    devAdded: {
      type: DevTypes,
      subscribe: withFilter(
        () => pubsub.asyncIterator([DEV_ADDED]),
        (rootValue, args, context, info) => {
          const { input } = args;

          const subscribed = {
            techs: parseStringAsArray(input.techs),
            coordinates: {
              latitude: Number(input.latitude),
              longitude: Number(input.longitude)
            }
          };

          return findConnections(subscribed, rootValue.devAdded);
        }
      ),
      args: {
        input: {
          type: new GraphQLInputObjectType({
            name: "DevTechs",
            fields: {
              latitude: {
                type: GraphQLString
              },
              longitude: {
                type: GraphQLString
              },
              techs: {
                type: GraphQLString
              }
            }
          })
        }
      }
    }
  }
};

const findConnections = (subscribed, rootValue) => {
  const coodinates = {
    latitude: rootValue.location.coordinates[0],
    longitude: rootValue.location.coordinates[1]
  };

  const dist = calculateDistance(subscribed.coordinates, coodinates);
  const someTech = subscribed.techs.some(tech =>
    rootValue.techs.includes(tech)
  );

  return dist <= 200 && someTech;
};
