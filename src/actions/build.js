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
  try {
    const buildUser = await context.prisma.buildUser.upsert({
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
    console.log(buildUser);
    return {
      buildUser,
      status: { code: "Success", message: "Build is Shared" }
    };
  } catch (err) {
    console.log(err);
    return {
      status: {
        code: err.code,
        message: err.message
      }
    };
  }
}

async function deleteBuildPermission(context, buildId, userId, permission) {
  try {
    const buildUser = await context.prisma.buildUser.delete({
      where: {
        userId_buildId: {
          userId,
          buildId
        }
      }
    });
    console.log(buildUser);
    return {
      buildUser,
      status: {
        message: "user no longer has access to this build!",
        code: "Success"
      }
    };
  } catch (err) {
    console.log(err);
    return {
      status: {
        code: err.code,
        message: err.message
      }
    };
  }
}
export { createBuild, editBuildPermission, deleteBuildPermission };
