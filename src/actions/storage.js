import { resolvePermission } from "./utils.js";

async function createStorage(context, name, description, userId) {
  try {
    const storage = await context.prisma.storage.create({
      data: {
        name,
        description,
        createdById: userId,
        editedById: userId
      }
    });

    const storageUser = await createPermissionOnStorage(
      context,
      userId,
      storage.id,
      "Owner",
      "Owner"
    );

    return {
      storage,
      permission: storageUser.permission,
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

async function updateStorage(
  context,
  storageId,
  name,
  description,
  permission
) {
  console.log(context.userId);
  try {
    const storage = await context.prisma.storage.update({
      where: {
        id: storageId
      },
      data: {
        name,
        description,
        editedById: context.userId
      }
    });

    return {
      storage,
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

async function deleteStorage(context, storageId) {
  try {
    const storage = await context.prisma.storage.delete({
      where: { id: storageId }
    });

    return {
      storage,
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

async function createPermissionOnStorage(
  context,
  userId,
  storageId,
  permission,
  userPermission
) {
  try {
    const storageUser = await context.prisma.storageUser.upsert({
      where: {
        userId_storageId: {
          userId,
          storageId
        }
      },
      update: {
        permission
      },
      create: {
        userId,
        storageId,
        permission
      }
    });

    return {
      storageUser,
      status: {
        code: "Success",
        message: "Storage has been shared"
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

async function deleteStoragePermission(context, userId, storageId) {
  try {
    const storageUser = await context.prisma.storageUser.delete({
      where: {
        userId_storageId: {
          userId,
          storageId
        }
      }
    });
    return {
      storageUser,
      status: {
        message: "You have removed permission for this user!",
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

async function createIngredientOnStorage(context, storageId, ingredientId) {
  try {
    const ingredientStorage = await context.prisma.ingredientStorage.create({
      data: {
        storageId,
        ingredientId
      }
    });

    return {
      ingredientStorage,
      status: {
        message: "You have added this storage to the recipe storage!",
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

async function deleteIngredientFromStorage(context, storageId, ingredientId) {
  try {
    const ingredientStorage = await context.prisma.ingredientStorage.delete({
      where: {
        ingredientId_storageId: {
          storageId,
          ingredientId
        }
      }
    });
    return {
      ingredientStorage,
      status: {
        message: "You have removed this storage from the storage!",
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
  createStorage,
  updateStorage,
  deleteStorage,
  createPermissionOnStorage,
  deleteStoragePermission,
  createIngredientOnStorage,
  deleteIngredientFromStorage
};
