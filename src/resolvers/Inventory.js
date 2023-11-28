function createdBy(parent, args, context) {
  return context.prisma.recipeBook
    .findUnique({
      where: { id: parent.id }
    })
    .createdBy();
}

export default {
  createdBy
};
