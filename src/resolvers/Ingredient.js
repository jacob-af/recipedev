function ingredientType(parent, args, context) {
  return context.prisma.ingredient
    .findUnique({
      where: { id: parent.id }
    })
    .ingredientType();
}

export default {
  ingredientType
};
