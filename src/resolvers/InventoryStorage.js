function storage(parent, args, context) {
  console.log("ding");
  return context.prisma.storage.findUnique({
    where: { id: parent.storageId }
  });
}

function inventory(parent, args, context) {
  console.log("ding");
  return context.prisma.inventory.findUnique({
    where: { id: parent.inventoryId }
  });
}

export default {
  storage,
  inventory
};
