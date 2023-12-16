import crew from "./crew.js";
import crewAsset from "./crewAsset.js";

import ingredientType from "./ingredientType.js";
import inventory from "./inventory.js";
import recipe from "./recipe.js";
import recipeBook from "./recipeBook.js";
import ingredient from "./ingredient.js";
import user from "./user.js";
import build from "./build.js";
import touch from "./touch.js";
import storage from "./storage.js";

export default {
  ...crew,
  ...crewAsset,
  ...ingredientType,
  ...inventory,
  ...recipe,
  ...recipeBook,
  ...ingredient,
  ...user,
  ...build,
  ...touch,
  ...storage
};
