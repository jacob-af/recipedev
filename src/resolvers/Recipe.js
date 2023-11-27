function createdBy(parent, args, context) {
  return context.prisma.recipe
    .findUnique({
      where: { id: parent.id }
    })
    .createdBy();
}

function build(parent, args, context) {
  return context.prisma.recipe
    .findUnique({
      where: { id: parent.id }
    })
    .build();
}

module.exports = {
  createdBy,
  build
};
