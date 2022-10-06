function spec(parent, args, context) {
  return context.prisma.touch.findUnique({ where: { id: parent.id } }).spec();
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
