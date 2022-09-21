function allGroups(parent, args, context) {
  return context.prisma.groups.findMany({});
}

function allUsers(parent, args, context) {
  return context.prisma.users.findMany({});
}

function allRecipes(parent, args, context) {
  return context.prisma.recipe.findMany({});
}

function allIngredients(parent, args, context) {
  return context.prisma.ingredient.findMany({});
}
function allVersions(parent, args, context) {
  return context.prisma.version.findMany({});
}
function allSpecs(parent, args, context) {
  return context.prisma.spec.findMany({});
}

module.exports = {
  allGroups,
  allUsers,
  allRecipes,
  allIngredients,
  allVersions,
  allSpecs
};
