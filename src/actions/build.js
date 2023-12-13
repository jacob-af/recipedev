import { resolvePermission } from "./utils.js";

async function createBuild(
  context,
  recipeId,
  buildName,
  instructions,
  glassware,
  ice,
  touchArray
) {
  const { userId } = context;
  const touchArrayWithId = touchArray.map((touch, index) => {
    return {
      order: index,
      genericIngredientId: touch.genericIngredientId,
      specificIngredientId: touch.specificIngredientId,
      amount: touch.amount,
      unit: touch.unit
    };
  });
  const build = await context.prisma.build.create({
    data: {
      recipeId,
      buildName,
      instructions,
      glassware,
      ice,
      createdById: userId,
      editedById: userId,
      touch: {
        create: touchArrayWithId
      }
    }
  });

  const { permission } = await editBuildPermission(
    context,
    build.id,
    userId,
    "Owner",
    "Owner"
  );
  return {
    build,
    permission,
    status: {
      code: "Success",
      message: "update this message"
    }
  };
}

async function editBuildPermission(
  context,
  buildId,
  userId,
  permission,
  userPermission
) {
  if (!resolvePermission(userPermission, permission)) {
    return {
      message: "You don't have permission to add to this Recipe Book",
      code: "Failure"
    };
  }
  const buildPermission = await context.prisma.buildUser.upsert({
    where: {
      userId_buildId: { userId, buildId }
    },
    update: {
      permission: permission
    },
    create: {
      userId,
      buildId,
      permission
    }
  });
  console.log(buildPermission);
  return buildPermission;
}

async function deleteBuildPermission(
  context,
  buildId,
  userId,
  permission,
  userPermission
) {
  if (
    !resolvePermission(userPermission, "Manager") ||
    !resolvePermission(userPermission, permission)
  ) {
    return {
      message: "You don't have permission to remove users from this build!",
      code: "Failure"
    };
  }
  const deletePermission = await context.prisma.buildUser.delete({
    where: {
      userId_buildId: {
        userId,
        buildId
      }
    }
  });
  console.log(deletePermission);
  return {
    message: "user no longer has access to this build!",
    code: "Success"
  };
}

export { createBuild, editBuildPermission, deleteBuildPermission };
