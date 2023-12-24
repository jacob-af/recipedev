function user(parent, args, context) {
  return context.prisma.user.findUnique({
    where: { id: parent.userId }
  });
}

function storage(parent, args, context) {
  return context.prisma.storage.findUnique({
    where: { id: parent.storageId }
  });
}

export default {
  user,
  storage
};
