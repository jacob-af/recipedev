import crew from "./crew.js";
import crewAsset from "./crewAsset.js";

import genericIngredient from "./genericIngredient.js";
import inventory from "./inventory.js";
import recipe from "./recipe.js";
import recipeBook from "./recipeBook.js";
import specificIngredient from "./specificIngredient.js";
import user from "./user.js";
import build from "./build.js";
import touch from "./touch.js";
import storage from "./storage.js";

export default {
  ...crew,
  ...crewAsset,
  ...genericIngredient,
  ...inventory,
  ...recipe,
  ...recipeBook,
  ...specificIngredient,
  ...user,
  ...build,
  ...touch,
  ...storage
};
