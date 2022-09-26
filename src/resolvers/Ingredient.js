function postedBy(parent, args, context) {
  return context.prisma.ingredient
    .findUnique({
      where: { id: parent.id }
    })
    .postedBy();
}

function touch(parent, args, context) {
  return context.prisma.ingredient
    .findUnique({
      where: { id: parent.id }
    })
    .touch();
}

module.exports = {
  postedBy,
  touch
};
