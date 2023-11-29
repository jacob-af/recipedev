// addRecipeBook;
// editRecipeBook;
// deleteRecipeBook;
// addRecipeBookPermission;
// editRecipeBookPermission;
// deleteRecipeBookPermission;

async function createRecipeBook(parent, args, context, info) {
  const { userId } = context;
  const recipeBook = await context.prisma.recipeBook.create({
    data: {
      name: args.name,
      description: args.description,
      createdById: userId,
      editedById: userId
    }
  });
  const recipeBookUser = await context.prisma.recipeBookUser.create({
    data: {
      userId: userId,
      recipeBookId: recipeBook.id,
      permission: "Own"
    }
  });
  return {
    status: `${recipeBook.name} Created, permission level ${recipeBookUser.permission}`,
    recipeBook
  };
}

export default { createRecipeBook };
