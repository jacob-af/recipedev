import crew from "./crew.js";
import ingredient from "./ingredient.js";
import inventory from "./inventory.js";
import mutations from "./mutations.js";
import recipeBook from "./recipeBook.js";
import user from "./user.js";
import util from "./util.js";
import query from "./query.js";

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

export default typeDefs;
