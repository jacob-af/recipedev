import build from "./build.js";
import crew from "./crew.js";
import crewAsset from "./crewAsset.js";
import ingredient from "./ingredient.js";
import inventory from "./inventory.js";
import query from "./query.js";
import recipeBook from "./recipeBook.js";
import recipe from "./recipe.js";
import storage from "./storage.js";
import touch from "./touch.js";
import user from "./user.js";
import util from "./util.js";

const typeDefs = [
  user,
  build,
  touch,
  crew,
  crewAsset,
  ingredient,
  inventory,
  recipeBook,
  recipe,
  storage,
  util,
  query
];

export default typeDefs;
