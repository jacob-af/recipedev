async function addRecipeBookPermission(parent, args, context, info) {
  const { userId } = context;
  const recipeBookUser = await context.prisma.recipeBookUser.create({
    data: {
      userId: userId,
      recipeBookId: args.recipeBookId,
      permission: args.permission
    }
  });
  return { status: `${recipeBookUser.permission}` };
}

export default {
  addRecipeBookPermission
};
