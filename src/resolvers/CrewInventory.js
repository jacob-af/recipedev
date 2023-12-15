function inventory(parent, args, context) {
  console.log("ding");
  return context.prisma.inventory.findUnique({
    where: { id: parent.inventoryId }
  });
}

function crew(parent, args, context) {
  console.log("ding");
  return context.prisma.crew.findUnique({
    where: { id: parent.crewId }
  });
}

export default {
  inventory,
  crew
};
