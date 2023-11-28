function build(parent, args, context) {
  return context.prisma.touch.findUnique({ where: { id: parent.id } }).build();
}

function genericIngredient(parent, args, context) {
  return context.prisma.touch
    .findUnique({ where: { id: parent.id } })
    .genericIngredient();
}

export default {
  build,
  genericIngredient
};
