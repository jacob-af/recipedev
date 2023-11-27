function createdBy(parent, args, context) {
  return context.prisma.recipeBook
    .findUnique({
      where: { id: parent.id }
    })
    .createdBy();
}

module.exports = {
  createdBy
};
