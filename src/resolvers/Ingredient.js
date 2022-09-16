function postedBy(parent, args, context) {
  return context.prisma.ingredient
    .findUnique({
      where: { id: parent.id }
    })
    .postedBy();
}

module.exports = {
  postedBy
};
