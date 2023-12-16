function createdBy(parent, args, context) {
  return context.prisma.user.findUnique({
    where: { id: parent.createdById }
  });
}

async function storage(parent, args, context) {
  const storageIds = await context.prisma.inventoryStorage.findMany({
    where: { inventoryId: parent.id }
  });

  const storage = await storageIds.map(storageId => {
    return context.prisma.storage.findUnique({
      where: { id: storageId.storageId }
    });
  });
  return storage;
}

async function ingredient(parent, args, context) {
  const ingredientIds = await context.prisma.inventoryIngredient.findMany({
    where: { inventoryId: parent.id }
  });

  const ingredient = await ingredientIds.map(ingredientId => {
    return context.prisma.ingredient.findUnique({
      where: { id: ingredientId.ingredientId }
    });
  });
  return ingredient;
}

export default {
  createdBy,
  storage,
  ingredient
};
