import { cache } from "../cache";

export const blankTouch = order => {
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
export const newBuildInfo = cache.makeVar({
  recipeName: "",
  recipeId: "",
  about: "",
  buildName: ""
});
export const newRecipeInfo = cache.makeVar({
  ice: "",
  glassware: "",
  instructions: "",
  notes: ""
});
export const touches = cache.makeVar([blankTouch(0), blankTouch(1)]);
export const newIngredient = cache.makeVar();
