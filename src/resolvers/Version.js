function postedBy(parent, args, context) {
  return context.prisma.version
    .findUnique({
      where: { id: parent.id }
    })
    .postedBy();
}

function recipe(parent, args, context) {
  return context.prisma.version
    .findUnique({ where: { id: parent.id } })
    .recipe();
}

function specs(parent, args, context) {
  return context.prisma.version
    .findUnique({ where: { id: parent.id } })
    .specs();
}

function usersVersion(parent, args, context) {
  return context.prisma.version
    .findUnique({ where: { versionId: parent.id } })
    .version();
}

module.exports = {
  postedBy,
  recipe,
  specs,
  usersVersion
};
