function postedBy(parent, args, context) {
  return context.prisma.recipe
    .findUnique({
      where: { id: parent.id }
    })
    .postedBy();
}

module.exports = {
  postedBy
};
