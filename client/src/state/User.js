import { cache } from "../cache";

export const blankBuild = [
  {
    order: 0,
    ingredientType: {},
    ingredient: {},
    amount: 0,
    unit: "oz"
  },
  {
    order: 0,
    ingredientType: {},
    ingredient: {},
    amount: 0,
    unit: "oz"
  }
];

export const token = cache.makeVar();
export const userData = cache.makeVar();
export const buildData = cache.makeVar();
export const recipeData = cache.makeVar();
export const recipeBookData = cache.makeVar();
export const ingredientTypes = cache.makeVar([]);
export const ingredients = cache.makeVar([]);
export const alertMessage = cache.makeVar();
export const newBuild = cache.makeVar(blankBuild);
export const newIngredient = cache.makeVar();
