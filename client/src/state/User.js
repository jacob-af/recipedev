import { cache } from "../cache";

export const token = cache.makeVar();

export const userData = cache.makeVar();
export const buildData = cache.makeVar();
export const recipeData = cache.makeVar();
export const recipeBookData = cache.makeVar();
export const genericIngredients = cache.makeVar([]);
export const alertMessage = cache.makeVar();

export const newRecipe = cache.makeVar([
  {
    order: 0,
    genericIngredient: {},
    specificIngredient: {},
    amount: 0,
    unit: "oz"
  },
  {
    order: 0,
    genericIngredient: {},
    specificIngredient: {},
    amount: 0,
    unit: "oz"
  }
]);
export const newIngredient = cache.makeVar();
