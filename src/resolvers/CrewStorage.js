function storage(parent, args, context) {
  console.log("ding");
  return context.prisma.storage.findUnique({
    where: { id: parent.storageId }
  });
}

function crew(parent, args, context) {
  console.log("ding");
  return context.prisma.crew.findUnique({
    where: { id: parent.crewId }
  });
}

export default {
  storage,
  crew
};
