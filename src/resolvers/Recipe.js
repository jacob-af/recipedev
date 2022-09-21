function postedBy(parent, args, context) {
  return context.prisma.recipe
    .findUnique({
      where: { id: parent.id }
    })
    .postedBy();
}

function versions(parent, args, context) {
  return context.prisma.recipe
    .findUnique({
      where: { id: parent.id }
    })
    .version();
}

module.exports = {
  postedBy,
  versions
};
