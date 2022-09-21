function version(parent, args, context) {
  return context.prisma.spec.findUnique({ where: { id: parent.id } }).version();
}

function ingredient(parent, args, context) {
  return context.prisma.spec
    .findUnique({ where: { id: parent.id } })
    .ingredient();
}

function postedBy(parent, args, context) {
  return context.prisma.spec
    .findUnique({ where: { id: parent.id } })
    .postedBy();
}

module.exports = {
  version,
  ingredient,
  postedBy
};
