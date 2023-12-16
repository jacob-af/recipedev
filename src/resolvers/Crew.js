async function build(parent, args, context) {
  const crewBuild = await context.prisma.crewBuild.findMany({
    where: { crewId: parent.id }
  });
  return crewBuild.map(async build => {
    return await context.prisma.build.findUnique({
      where: { id: build.buildId }
    });
  });
}

async function ingredient(parent, args, context) {
  const crewIng = await context.prisma.crewIngredient.findMany({
    where: { crewId: parent.id }
  });
  return crewIng.map(async ing => {
    return await context.prisma.Ingredient.findUnique({
      where: { id: ing.ingredientId }
    });
  });
}
async function inventory(parent, args, context) {
  const crewInventory = await context.prisma.crewInventory.findMany({
    where: { crewId: parent.id }
  });
  return crewInventory.map(async inventory => {
    return await context.prisma.inventory.findUnique({
      where: { id: inventory.inventoryId }
    });
  });
}
async function recipeBook(parent, args, context) {
  const crewRecipeBook = await context.prisma.crewRecipeBook.findMany({
    where: { crewId: parent.id }
  });
  return crewRecipeBook.map(async recipeBook => {
    return await context.prisma.recipeBook.findUnique({
      where: { id: recipeBook.recipeBookId }
    });
  });
}
async function storage(parent, args, context) {
  const crewStorage = await context.prisma.crewStorage.findMany({
    where: { crewId: parent.id }
  });

  return crewStorage.map(async storage => {
    return await context.prisma.storage.findUnique({
      where: { id: storage.storageId }
    });
  });
}

export default {
  build,
  ingredient,
  inventory,
  recipeBook,
  storage
};
