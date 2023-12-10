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
  const recipeBookUser = await permissionOnRecipeBook(
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

async function permissionOnRecipeBook(
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
  console.log("dong");
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
    message: "You have added this build to the recipe book",
    code: "Success"
  };
}

export {
  createRecipeBook,
  permissionOnRecipeBook,
  updateRecipeBook,
  deleteRecipeBook,
  createBuildOnRecipeBook
};
