import crew from "./crew.js";
import build from "./build.js";
import touch from "./touch.js";
import ingredient from "./ingredient.js";
import inventory from "./inventory.js";
import mutations from "./mutations.js";
import recipeBook from "./recipeBook.js";
import recipe from "./recipe.js";
import user from "./user.js";
import util from "./util.js";
import query from "./query.js";

const typeDefs = [
  user,
  build,
  touch,
  crew,
  ingredient,
  inventory,
  mutations,
  recipeBook,
  recipe,
  util,
  query
];

export default typeDefs;
