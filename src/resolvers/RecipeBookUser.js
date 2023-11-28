function user(parent, args, context) {
  return context.prisma.user.findUnique({
    where: { id: parent.userId }
  });
}

async function recipeBook(parent, args, context) {
  return await context.prisma.recipeBook.findUnique({
    where: { id: parent.recipeBookId }
  });
}

module.exports = {
  recipeBook,
  user
};
