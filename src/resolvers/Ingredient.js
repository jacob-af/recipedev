function postedBy(parent, args, context) {
  return context.prisma.ingredient
    .findUnique({
      where: { id: parent.id }
    })
    .postedBy();
}

function specs(parent, args, context) {
  return context.prisma.ingredient
    .findUnique({
      where: { id: parent.id }
    })
    .spec();
}

module.exports = {
  postedBy,
  specs
};
