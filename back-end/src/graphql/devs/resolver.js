const DevController = require("../../controllers/DevController");
const SearchController = require("../../controllers/SearchController");

module.exports = {
  getDevs: async () => {
    return DevController.index();
  },

  searchDevs: async (source, args, context, info) => {
    return SearchController.index(args.input);
  },

  saveDev: async (source, args, context, info) => {
    return DevController.store(args.input);
  }
};
