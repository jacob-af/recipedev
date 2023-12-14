function user(parent, args, context) {
  console.log("ding");
  return context.prisma.user.findUnique({
    where: { id: parent.userId }
  });
}

function inventory(parent, args, context) {
  console.log("ding");
  return context.prisma.inventory.findUnique({
    where: { id: parent.inventoryId }
  });
}

export default {
  user,
  inventory
};
