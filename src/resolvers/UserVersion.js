function users(parent, args, context) {
  return context.prisma.userversion
    .findUnique({
      where: { userId: parent.id }
    })
    .users();
}

function versions(parent, args, context) {
  return context.prisma.userversion
    .findUnique({
      where: { versionId: parent.id }
    })
    .version();
}

module.exports = {
  versions,
  users
};
