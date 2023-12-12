import { resolvePermission } from "./utils.js";

async function createRecipeBook(context, name, description, userId) {
  const recipeBook = await context.prisma.recipeBook.create({
    data: {
      name,
      description,
      createdById: userId,
      editedById: userId
    }
  });
  console.log(recipeBook.id);
  const recipeBookUser = await createPermissionOnRecipeBook(
    context,
    userId,
    recipeBook.id,
    "Owner",
    "Owner"
  );

  return {
    recipeBook,
    permission: recipeBookUser.permission,
    status: {
      message: "It works!",
      code: "Success"
    }
  };
}

async function updateRecipeBook(
  context,
  recipeBookId,
  name,
  description,
  userPermission
) {
  console.log(context.userId);
  if (resolvePermission(userPermission, "Manager")) {
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
      permission: userPermission,
      status: {
        message: "It works!",
        code: "Success"
      }
    };
  }
}

async function deleteRecipeBook(context, recipeBookId, permission) {
  if (resolvePermission(permission, "Owner")) {
    const recipeBook = await context.prisma.recipeBook.delete({
      where: { id: recipeBookId }
    });
    console.log(recipeBook);
    return {
      message: "It works!",
      code: "Success"
    };
  }
}

async function createBuildOnRecipeBook(
  context,
  buildId,
  recipeBookId,
  bookPermission,
  buildPermission
) {
  console.log("ding");
  if (!resolvePermission(bookPermission, "Manager")) {
    return {
      message: "You don't have permission to add to this Recipe Book",
      code: "Failure"
    };
  }
  if (!resolvePermission(buildPermission, "Manager")) {
    return {
      message: "You don't have permission to add this build to a book",
      code: "Failure"
    };
  }
  const bookOnBuild = await context.prisma.recipeBookBuild.create({
    data: {
      buildId,
      recipeBookId
    }
  });
  console.log(bookOnBuild);
  return {
    message: "You have added this build to the recipe book!",
    code: "Success"
  };
}

async function deleteBuildFromRecipeBook(
  context,
  buildId,
  recipeBookId,
  permission
) {
  console.log(resolvePermission(permission, "Manager"));
  if (!resolvePermission(permission, "Manager")) {
    return {
      message:
        "You don't have permission to remove anything from this Recipe Book",
      code: "Failure"
    };
  }
  const deleteBuild = await context.prisma.recipeBookBuild.delete({
    where: {
      buildId_recipeBookId: {
        buildId,
        recipeBookId
      }
    }
  });
  return {
    message: "You have removed this build from the recipe book!",
    code: "Success"
  };
}

async function createPermissionOnRecipeBook(
  context,
  userId,
  recipeBookId,
  permission,
  userPermission
) {
  if (resolvePermission(userPermission, permission)) {
    console.log("hello");
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
    console.log(recipeBookUser);
    return recipeBookUser;
  }
}

async function deleteRecipeBookPermission(
  context,
  userId,
  recipeBookId,
  permission
) {
  if (!resolvePermission(permission, "Manager")) {
    return {
      message: "You don't have permission to remove users from this book!",
      code: "Failure"
    };
  }
  const deletePermission = await context.prisma.recipeBookUser.delete({
    where: {
      userId_recipeBookId: {
        userId,
        recipeBookId
      }
    }
  });
  console.log(deletePermission);
  return {
    message: "You have removed this build from the recipe book!",
    code: "Success"
  };
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
