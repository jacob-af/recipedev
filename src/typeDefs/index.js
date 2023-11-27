const crew = require("./crew");
const ingredient = require("./ingredient");
const inventory = require("./inventory");
const mutations = require("./mutations");
const recipeBook = require("./recipeBook");
const user = require("./user");
const util = require("./util");
const query = require("./query");

const typeDefs = [
  user,
  crew,
  ingredient,
  inventory,
  mutations,
  recipeBook,
  util,
  query
];

module.exports = typeDefs;
