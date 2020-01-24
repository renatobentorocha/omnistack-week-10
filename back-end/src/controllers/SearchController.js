const Dev = require("../models/DevModel");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index({ latitude, longitude, techs }) {
    const techArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [latitude, longitude]
          },
          $maxDistance: 200000
        }
      }
    });

    return devs;
  }
};
