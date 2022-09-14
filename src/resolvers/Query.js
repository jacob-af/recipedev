function allGroups(parent, args, context) {
  return context.prisma.Groups.findMany({});
}

function allUsers(parent, args, context) {
  return context.prisma.users.findMany({});
}

function allRecipes(parent, args, context) {
  return context.prisma.recipes.findMany({});
}

module.exports = {
  allGroups,
  allUsers,
  allRecipes
};
