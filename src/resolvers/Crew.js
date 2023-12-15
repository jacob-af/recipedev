function build(parent, args, context) {
  return context.prisma.crewBuild
    .findMany({
      where: { crewId: parent.id }
    })
    .build();
}

function ingredient(parent, args, context) {
  return context.prisma.crewIngredient
    .findUnique({
      where: { crewId: parent.id }
    })
    .ingredient();
}
function inventory(parent, args, context) {
  return context.prisma.recipe
    .findUnique({
      where: { crewId: parent.id }
    })
    .inventory();
}
function recipeBook(parent, args, context) {
  return context.prisma.recipe
    .findUnique({
      where: { crewId: parent.id }
    })
    .recipeBook();
}
function storage(parent, args, context) {
  return context.prisma.recipe
    .findUnique({
      where: { crewId: parent.id }
    })
    .storage();
}

export default {
  // createdBy,
  build,
  ingredient,
  inventory,
  recipeBook,
  storage
};
