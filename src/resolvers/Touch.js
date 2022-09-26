function spec(parent, args, context) {
  return context.prisma.touch
    .findUnique({ where: { id: parent.id } })
    .version();
}

function ingredient(parent, args, context) {
  return context.prisma.touch
    .findUnique({ where: { id: parent.id } })
    .ingredient();
}

function postedBy(parent, args, context) {
  return context.prisma.touch
    .findUnique({ where: { id: parent.id } })
    .postedBy();
}

module.exports = {
  spec,
  ingredient,
  postedBy
};
