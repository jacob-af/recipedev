import { resolvePermission } from "./utils.js";

async function createStorage(context, name, description, userId) {
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
}

async function updateStorage(
  context,
  storageId,
  name,
  description,
  userPermission
) {
  console.log(context.userId);
  if (resolvePermission(userPermission, "Manager")) {
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
      permission: userPermission,
      status: {
        message: "It works!",
        code: "Success"
      }
    };
  }
}

async function deleteStorage(context, storageId, permission) {
  if (resolvePermission(permission, "Owner")) {
    const storage = await context.prisma.storage.delete({
      where: { id: storageId }
    });

    return {
      message: "It works!",
      code: "Success"
    };
  }
}

async function createStorageOnStorage(
  context,
  storageId,
  storageId,
  storagePermission,
  storagePermission
) {
  if (!resolvePermission(storagePermission, "Manager")) {
    return {
      message: "You don't have permission to add to this Storage",
      code: "Failure"
    };
  }
  if (!resolvePermission(storagePermission, "Manager")) {
    return {
      message: "You don't have permission to add this storage to an storage",
      code: "Failure"
    };
  }
  const storageOnStorage = await context.prisma.storageStorage.create({
    data: {
      storageId,
      storageId
    }
  });

  return {
    message: "You have added this storage to the recipe storage!",
    code: "Success"
  };
}

async function deleteStorageFromStorage(
  context,
  storageId,
  storageId,
  permission
) {
  if (!resolvePermission(permission, "Manager")) {
    return {
      message: "You don't have permission to remove anything from this storage",
      code: "Failure"
    };
  }
  const deleteStorage = await context.prisma.storageStorage.delete({
    where: {
      storageId_storageId: {
        storageId,
        storageId
      }
    }
  });
  return {
    message: "You have removed this storage from the storage!",
    code: "Success"
  };
}

async function createPermissionOnStorage(
  context,
  userId,
  storageId,
  permission,
  userPermission
) {
  if (resolvePermission(userPermission, permission)) {
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

    return storageUser;
  }
}

async function deleteStoragePermission(context, userId, storageId, permission) {
  console.log(resolvePermission(permission, "Manager"));
  if (!resolvePermission(permission, "Manager")) {
    return {
      message: "You don't have permission to remove recipes from this storage!",
      code: "Failure"
    };
  }
  const deletePermission = await context.prisma.storageUser.delete({
    where: {
      userId_storageId: {
        userId,
        storageId
      }
    }
  });
  console.log(deletePermission);
  return {
    message: "You have removed permission for this user!",
    code: "Success"
  };
}

export {
  createStorage,
  updateStorage,
  deleteStorage,
  createStorageOnStorage,
  deleteStorageFromStorage,
  createPermissionOnStorage,
  deleteStoragePermission
};
