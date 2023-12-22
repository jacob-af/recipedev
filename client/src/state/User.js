import { cache } from "../cache";

export const blankBuild = order => {
  return {
    order,
    ingredientType: {},
    ingredient: {},
    amount: 0,
    unit: "oz"
  };
};

export const token = cache.makeVar();
export const userData = cache.makeVar();
export const buildData = cache.makeVar();
export const recipeData = cache.makeVar();
export const recipeBookData = cache.makeVar();
export const ingredientTypes = cache.makeVar([]);
export const ingredients = cache.makeVar([]);
export const alertMessage = cache.makeVar();
export const newBuildInfo = cache.makeVar({});
export const newBuildSpec = cache.makeVar([blankBuild(0), blankBuild(1)]);
export const newIngredient = cache.makeVar();
