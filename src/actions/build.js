import { createTouchArray, archiveTouchArray } from "./touch.js";

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
        create: touchArrayWithIndex(touchArray, 0)
      }
    }
  });
  const {
    buildUser: { permission }
  } = await editBuildPermission(context, build.id, userId, "Owner");
  console.log(permission);
  return {
    build,
    permission,
    status: {
      code: "Success",
      message: "update this message"
    }
  };
}

async function updateBuild(
  context,
  buildId,
  recipeId,
  buildName,
  instructions,
  glassware,
  ice,
  touchArray
) {
  try {
    const archivedBuild = await archiveBuild(context, buildId);

    const build = await context.prisma.build.update({
      where: {
        id: buildId
      },
      data: {
        recipeId,
        buildName,
        instructions,
        glassware,
        ice,
        touch: {
          create: touchArrayWithIndex(touchArray, archivedBuild.version + 1)
        },
        version: archivedBuild.version + 1
      }
    });

    return {
      build,
      status: {
        code: "Success",
        message: "Against all sanity, you didi it!"
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

async function deleteBuild(context, buildId) {
  const build = await context.prisma.build.delete({
    where: { id: buildId }
  });
  return {
    build,
    status: {
      code: "Success",
      message: "You have archived this build"
    }
  };
}

function touchArrayWithIndex(touchArray, version) {
  return touchArray.map((touch, index) => {
    return {
      order: index,
      genericIngredientId: touch.genericIngredientId,
      specificIngredientId: touch.specificIngredientId,
      amount: touch.amount,
      unit: touch.unit,
      version
    };
  });
}

async function archiveBuild(context, buildId) {
  try {
    const { buildName, recipeId, instructions, glassware, ice, version } =
      await context.prisma.build.findUnique({
        where: {
          id: buildId
        }
      });
    const touch = await context.prisma.touch.findMany({
      where: {
        buildId,
        version
      }
    });
    const arcBuild = await context.prisma.archivedBuild.create({
      data: {
        buildId,
        buildName,
        createdById: context.userId,
        recipeId,
        instructions,
        glassware,
        ice,
        version,
        archivedTouch: {
          create: touchArrayWithIndex(touch, version)
        }
      }
    });
    const deletedArray = await touch.map(async t => {
      console.log(t);
      return await context.prisma.touch.delete({
        where: { id: t.id }
      });
    });
    const archivedBuild = {
      ...arcBuild,
      archivedTouch: deletedArray
    };
    return archivedBuild;
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

async function editBuildPermission(context, buildId, userId, permission) {
  try {
    console.log(permission);
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

async function deleteBuildPermission(context, buildId, userId) {
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
export {
  createBuild,
  updateBuild,
  deleteBuild,
  editBuildPermission,
  deleteBuildPermission
};
