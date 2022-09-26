function postedBy(parent, args, context) {
  return context.prisma.recipe
    .findUnique({
      where: { id: parent.id }
    })
    .postedBy();
}

function spec(parent, args, context) {
  return context.prisma.recipe
    .findUnique({
      where: { id: parent.id }
    })
    .spec();
}

module.exports = {
  postedBy,
  spec
};
