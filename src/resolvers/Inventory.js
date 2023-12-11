function createdBy(parent, args, context) {
  return context.prisma.recipeBook
    .findUnique({
      where: { id: parent.id }
    })
    .createdBy();
}

async function inventoryStorage(parent, args, context) {
  console.log(parent);
  const storageIds = await context.prisma.insventoryStorage.findMany({
    where: { inventoryId: parent.inventoryId }
  });
  console.log(storageIds);
  const storage = await storageIds.map(async storageId => {
    return context.prisma.storage.findUnique({
      where: { id: storageId.storageId }
    });
  });
  return storage;
}

export default {
  createdBy,
  inventoryStorage
};
