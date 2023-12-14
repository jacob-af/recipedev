function user(parent, args, context) {
  console.log("ding");
  return context.prisma.user.findUnique({
    where: { id: parent.userId }
  });
}

function storage(parent, args, context) {
  console.log("ding");
  return context.prisma.storage.findUnique({
    where: { id: parent.storageId }
  });
}

export default {
  user,
  storage
};
