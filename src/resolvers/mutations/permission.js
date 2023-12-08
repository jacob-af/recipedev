import { resolvePermission, getUserId } from "../../utils.js";

async function addRecipeBookPermission(parent, args, context, info) {
  if (resolvePermission(args.userPermission, args.toUserPermission)) {
    const recipeBook = await context.prisma.recipeBookUser.upsert({
      where: {
        userId_recipeBookId: {
          userId: args.toUser,
          recipeBookId: args.recipeBookId
        }
      },
      update: {
        permission: args.toUserPermission
      },
      create: {
        userId: args.toUser,
        recipeBookId: args.recipeBookId,
        permission: args.toUserPermission
      }
    });
    console.log(recipeBook);
    return { id: recipeBook.recipeBookId, status: "boop" };
  }
}

async function addBuildPermissions(parent, args, context, info) {
  if (resolvePermission(args.userPermission, args.toUserPermission)) {
    const build = await context.prisma.buildUser.upsert({
      where: {
        userId_buildId: { userId: args.toUser, buildId: args.buildId }
        // userId: { equals: args.toUser },
        // buildId: { equals: args.buildId }
      },
      update: {
        permission: args.toUserPermission
      },
      create: {
        userId: args.toUser,
        buildId: args.buildId,
        permission: args.toUserPermission
      }
    });
    console.log(build);
    return { id: build.buildId, status: "boop" };
  }
}

export default {
  addRecipeBookPermission,
  addBuildPermissions
};
