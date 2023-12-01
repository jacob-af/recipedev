import crew from "./crew.js";
import build from "./build.js";
import genericIngredient from "./genericIngredient.js";
import inventory from "./inventory.js";
import permission from "./permission.js";
import recipe from "./recipe.js";
import recipeBook from "./recipeBook.js";
import specificIngredient from "./specificIngredient.js";
import user from "./user.js";

export default {
  ...crew,
  ...build,
  ...genericIngredient,
  ...inventory,
  ...permission,
  ...recipe,
  ...recipeBook,
  ...specificIngredient,
  ...user
};
