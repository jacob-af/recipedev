import { resolvePermission } from "./utils.js";

async function createInventory(context, name, description, userId) {
  try {
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
      "Owner"
    );

    return {
      inventory,
      permission: inventoryUser.inventoryUser.permission,
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

async function updateInventory(context, inventoryId, name, description) {
  console.log(context.userId);
  try {
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

async function deleteInventory(context, inventoryId) {
  try {
    const inventory = await context.prisma.inventory.delete({
      where: { id: inventoryId }
    });

    return {
      inventory,
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

async function createStorageOnInventory(context, storageId, inventoryId) {
  try {
    const inventoryStorage = await context.prisma.inventoryStorage.create({
      data: {
        storageId,
        inventoryId
      }
    });

    return {
      inventoryStorage,
      status: {
        message: "You have added this storage to the recipe inventory!",
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

async function deleteStorageFromInventory(context, storageId, inventoryId) {
  const invenetoryStorage = await context.prisma.inventoryStorage.delete({
    where: {
      inventoryId_storageId: {
        storageId,
        inventoryId
      }
    }
  });
  return {
    invenetoryStorage,
    status: {
      message: "You have removed this storage from the inventory!",
      code: "Success"
    }
  };
}

async function createPermissionOnInventory(
  context,
  userId,
  inventoryId,
  permission
) {
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

  return {
    inventoryUser,
    status: { code: "Success", message: "Permission CHanged" }
  };
}

async function deleteInventoryPermission(context, userId, inventoryId) {
  const inventoryUser = await context.prisma.inventoryUser.delete({
    where: {
      userId_inventoryId: {
        userId,
        inventoryId
      }
    }
  });
  return {
    inventoryUser,
    status: {
      message: "You have removed permission for this user!",
      code: "Success"
    }
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
