const axios = require("axios");
const Dev = require("../models/DevModel");
const parseStringAsArray = require("../utils/parseStringAsArray");
const pubsub = require("../services/PubSub");

const DEV_ADDED = require("../constants/devs");

module.exports = {
  async index() {
    const devs = await Dev.find();

    return devs;
  },

  async store({ github_username, techs, latitude, longitude }) {
    try {
      let dev = await Dev.findOne({ github_username });

      if (dev) {
        return dev;
      }

      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, bio, avatar_url } = response.data;

      const techArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [latitude, longitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        bio,
        avatar_url,
        techs: techArray,
        location
      });

      pubsub.publish(DEV_ADDED, { devAdded: dev });

      return dev;
    } catch (error) {
      return error;
    }
  }
};
