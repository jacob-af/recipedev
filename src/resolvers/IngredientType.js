function touch(parent, args, context) {
  return context.prisma.ingredientType
    .findUnique({
      where: { id: parent.id }
    })
    .touch();
}

export default {
  touch
};
