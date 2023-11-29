// addRecipeBook;
// editRecipeBook;
// deleteRecipeBook;
// addRecipeBookPermission;
// editRecipeBookPermission;
// deleteRecipeBookPermission;

import addBuild from "./build.js";

async function addRecipe(parent, args, context, info) {
  const { userId } = context;
  const recipe = await context.prisma.recipe.create({
    data: {
      name: args.name,
      origin: args.origin,
      history: args.history,
      createdById: userId
    }
  });
  const argsWithRecipeId = {
    ...args,
    recipeId: recipe.id
  };
  //console.log(argsWithRecipeId);
  const build = await addBuild(parent, argsWithRecipeId, context, info);

  return { recipe, build };
}

export default {
  addRecipe
};
