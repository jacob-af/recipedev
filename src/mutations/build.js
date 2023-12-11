import { resolvePermission } from "../helperFunctions/utils.js";

async function changeBuildPermission(parent, args, context, info) {
  if (resolvePermission(args.userPermission, args.permission)) {
    const build = await context.prisma.buildUser.upsert({
      where: {
        userId_buildId: { userId: args.userId, buildId: args.buildId }
      },
      update: {
        permission: args.permission
      },
      create: {
        userId: args.userId,
        buildId: args.buildId,
        permission: args.permission
      }
    });
    console.log(build);
    return {
      code: "Success",
      message: "you gave access to the build, or changed it, whatever"
    };
  }
}

export default {
  changeBuildPermission
};
