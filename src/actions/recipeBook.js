async function createRecipeBook(context, name, description, userId) {
  let recipeBook = {};
  let recipeBookUser = {};
  try {
    recipeBook = await context.prisma.recipeBook.create({
      data: {
        name,
        description,
        createdById: userId,
        editedById: userId
      }
    });
    recipeBookUser = await createPermissionOnRecipeBook(
      context,
      userId,
      recipeBook.id,
      "Owner",
      "Owner"
    );
  } catch (err) {
    console.log(err);
    return {
      status: {
        code: err.code,
        message: err.message
      }
    };
  }

  return {
    recipeBook,
    permission: recipeBookUser.permission,
    status: {
      message: "It works!",
      code: "Success"
    }
  };
}

async function updateRecipeBook(context, recipeBookId, name, description) {
  try {
    const recipeBook = await context.prisma.recipeBook.update({
      where: {
        id: recipeBookId
      },
      data: {
        name,
        description,
        editedById: context.userId
      }
    });

    return {
      recipeBook,
      status: {
        message: "It works!",
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

async function deleteRecipeBook(context, recipeBookId, permission) {
  try {
    const recipeBook = await context.prisma.recipeBook.delete({
      where: { id: recipeBookId }
    });
    console.log(recipeBook);
    return {
      recipeBook,
      status: { message: "It works!", code: "Success" }
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

async function createBuildOnRecipeBook(context, buildId, recipeBookId) {
  try {
    const recipeBookBuild = await context.prisma.recipeBookBuild.create({
      data: {
        buildId,
        recipeBookId
      }
    });
    console.log(recipeBookBuild);
    return {
      recipeBookBuild,
      status: {
        message: "You have added this build to the recipe book!",
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

async function deleteBuildFromRecipeBook(context, buildId, recipeBookId) {
  try {
    const recipeBookBuild = await context.prisma.recipeBookBuild.delete({
      where: {
        buildId_recipeBookId: {
          buildId,
          recipeBookId
        }
      }
    });
    return {
      recipeBookBuild,
      status: {
        message: "You have removed this build from the recipe book!",
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

async function createPermissionOnRecipeBook(
  context,
  userId,
  recipeBookId,
  permission
) {
  try {
    const recipeBookUser = await context.prisma.recipeBookUser.upsert({
      where: {
        userId_recipeBookId: {
          userId,
          recipeBookId
        }
      },
      update: {
        permission
      },
      create: {
        userId,
        recipeBookId,
        permission
      }
    });
    return {
      recipeBookUser,
      status: {
        message: "Permission on Recipe Book has changed",
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

async function deleteRecipeBookPermission(
  context,
  userId,
  recipeBookId,
  permission
) {
  try {
    const recipeBookUser = await context.prisma.recipeBookUser.delete({
      where: {
        userId_recipeBookId: {
          userId,
          recipeBookId
        }
      }
    });
    console.log(deletePermission);
    return {
      recipeBookUser,
      status: {
        message: "You have removed this build from the recipe book!",
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
  createRecipeBook,
  updateRecipeBook,
  deleteRecipeBook,
  createBuildOnRecipeBook,
  deleteBuildFromRecipeBook,
  createPermissionOnRecipeBook,
  deleteRecipeBookPermission
};
