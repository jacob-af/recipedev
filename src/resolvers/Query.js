function allCrews(parent, args, context) {
  return context.prisma.crew.findMany({});
}

function allUsers(parent, args, context) {
  return context.prisma.user.findMany({});
}

function allRecipes(parent, args, context) {
  return context.prisma.recipe.findMany({});
}

function allRecipeBooks(parent, args, context) {
  return context.prisma.recipeBook.findMany({});
}

function allRecipeBookUsers(parent, args, context) {
  return context.prisma.recipeBookUser.findMany({});
}

function allGenericIngredients(parent, args, context) {
  return context.prisma.genericIngredient.findMany({});
}

function allSpecificIngredients(parent, args, context) {
  return context.prisma.specificIngredient.findMany({});
}
function allTouches(parent, args, context) {
  return context.prisma.touch.findMany({});
}
function allBuilds(parent, args, context) {
  return context.prisma.build.findMany({});
}

module.exports = {
  allCrews,
  allUsers,
  allRecipes,
  allGenericIngredients,
  allSpecificIngredients,
  allRecipeBookUsers,
  allTouches,
  allBuilds,
  allRecipeBooks
};
