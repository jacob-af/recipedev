function build(parent, args, context) {
  return context.prisma.touch.findUnique({ where: { id: parent.id } }).build();
}

function genericIngredient(parent, args, context) {
  return context.prisma.touch
    .findUnique({ where: { id: parent.id } })
    .genericIngredient();
}

function specificIngredient(parent, args, context) {
  console.log(parent);
  return context.prisma.touch
    .findUnique({ where: { id: parent.id } })
    .specificIngredient();
}

export default {
  build,
  specificIngredient,
  genericIngredient
};
