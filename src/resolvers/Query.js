function allGroups(parent, args, context) {
  return context.prisma.group.findMany({});
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

function allIngredients(parent, args, context) {
  return context.prisma.ingredient.findMany({});
}
function allTouches(parent, args, context) {
  return context.prisma.touch.findMany({});
}
function allSpecs(parent, args, context) {
  return context.prisma.spec.findMany({});
}

module.exports = {
  allGroups,
  allUsers,
  allRecipes,
  allIngredients,
  allTouches,
  allSpecs,
  allRecipeBooks
};
