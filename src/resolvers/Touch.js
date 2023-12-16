function build(parent, args, context) {
  return context.prisma.touch.findUnique({ where: { id: parent.id } }).build();
}

function ingredientType(parent, args, context) {
  return context.prisma.touch
    .findUnique({ where: { id: parent.id } })
    .ingredientType();
}

function ingredient(parent, args, context) {
  console.log(parent);
  return context.prisma.touch
    .findUnique({ where: { id: parent.id } })
    .ingredient();
}

export default {
  build,
  ingredient,
  ingredientType
};
