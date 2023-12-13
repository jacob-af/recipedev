import { resolvePermission } from "./utils.js";

async function createInventory(context, name, description, userId) {
  const inventory = await context.prisma.inventory.create({
    data: {
      name,
      description,
      createdById: userId,
      editedById: userId
    }
  });

  const inventoryUser = await createPermissionOnInventory(
    context,
    userId,
    inventory.id,
    "Owner",
    "Owner"
  );

  return {
    inventory,
    permission: inventoryUser.permission,
    status: {
      message: "It works!",
      code: "Success"
    }
  };
}

async function updateInventory(
  context,
  inventoryId,
  name,
  description,
  userPermission
) {
  console.log(context.userId);
  if (resolvePermission(userPermission, "Manager")) {
    const inventory = await context.prisma.inventory.update({
      where: {
        id: inventoryId
      },
      data: {
        name,
        description,
        editedById: context.userId
      }
    });

    return {
      inventory,
      permission: userPermission,
      status: {
        message: "It works!",
        code: "Success"
      }
    };
  }
}

async function deleteInventory(context, inventoryId, permission) {
  if (resolvePermission(permission, "Owner")) {
    const inventory = await context.prisma.inventory.delete({
      where: { id: inventoryId }
    });

    return {
      message: "It works!",
      code: "Success"
    };
  }
}

async function createStorageOnInventory(
  context,
  storageId,
  inventoryId,
  inventoryPermission,
  storagePermission
) {
  if (!resolvePermission(inventoryPermission, "Manager")) {
    return {
      message: "You don't have permission to add to this Inventory",
      code: "Failure"
    };
  }
  if (!resolvePermission(storagePermission, "Manager")) {
    return {
      message: "You don't have permission to add this storage to an inventory",
      code: "Failure"
    };
  }
  const inventoryOnStorage = await context.prisma.inventoryStorage.create({
    data: {
      storageId,
      inventoryId
    }
  });

  return {
    message: "You have added this storage to the recipe inventory!",
    code: "Success"
  };
}

async function deleteStorageFromInventory(
  context,
  storageId,
  inventoryId,
  permission
) {
  if (!resolvePermission(permission, "Manager")) {
    return {
      message:
        "You don't have permission to remove anything from this inventory",
      code: "Failure"
    };
  }
  const deleteStorage = await context.prisma.inventoryStorage.delete({
    where: {
      inventoryId_storageId: {
        storageId,
        inventoryId
      }
    }
  });
  return {
    message: "You have removed this storage from the inventory!",
    code: "Success"
  };
}

async function createPermissionOnInventory(
  context,
  userId,
  inventoryId,
  permission,
  userPermission
) {
  if (resolvePermission(userPermission, permission)) {
    const inventoryUser = await context.prisma.inventoryUser.upsert({
      where: {
        userId_inventoryId: {
          userId,
          inventoryId
        }
      },
      update: {
        permission
      },
      create: {
        userId,
        inventoryId,
        permission
      }
    });

    return inventoryUser;
  }
}

async function deleteInventoryPermission(
  context,
  userId,
  inventoryId,
  permission
) {
  console.log(resolvePermission(permission, "Manager"));
  if (!resolvePermission(permission, "Manager")) {
    return {
      message:
        "You don't have permission to remove recipes from this inventory!",
      code: "Failure"
    };
  }
  const deletePermission = await context.prisma.inventoryUser.delete({
    where: {
      userId_inventoryId: {
        userId,
        inventoryId
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
  createInventory,
  updateInventory,
  deleteInventory,
  createStorageOnInventory,
  deleteStorageFromInventory,
  createPermissionOnInventory,
  deleteInventoryPermission
};
