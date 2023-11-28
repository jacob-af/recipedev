function touch(parent, args, context) {
  return context.prisma.genericIngredient
    .findUnique({
      where: { id: parent.id }
    })
    .touch();
}

export default {
  touch
};
