import {
  createInventory,
  updateInventory,
  deleteInventory,
  createStorageOnInventory,
  deleteStorageFromInventory,
  createPermissionOnInventory,
  deleteInventoryPermission
} from "../helperFunctions/inventory.js";

async function newInventory(parent, args, context, info) {
  const { userId } = context;
  console.log("ding");
  const { inventory, permission, status } = await createInventory(
    context,
    args.name,
    args.description,
    userId
  );

  return {
    status,
    permission,
    inventory
  };
}

async function editInventory(parent, args, context, info) {
  const { inventory, permission, status } = await updateInventory(
    context,
    args.inventoryId,
    args.name,
    args.description,
    args.permission
  );

  return {
    status,
    permission,
    inventory
  };
}

async function trashInventory(parent, args, context, info) {
  const statusMessage = await deleteInventory(
    context,
    args.inventoryId,
    args.permission
  );
  return statusMessage;
}

async function addStorageToInventory(parent, args, context, info) {
  return await createStorageOnInventory(
    context,
    args.storageId,
    args.inventoryId,
    args.inventoryPermission,
    args.storagePermission
  );
}

async function removeStorageFromInventory(parent, args, context, info) {
  return await deleteStorageFromInventory(
    context,
    args.storageId,
    args.inventoryId,
    args.permission
  );
}

async function changeInventoryPermission(parent, args, context, info) {
  const inventory = await createPermissionOnInventory(
    context,
    args.userId,
    args.inventoryId,
    args.permission,
    args.userPermission
  );
  return {
    status: { message: "barf", code: "success" },
    inventoryId: inventory.inventoryId
  };
}

async function removeInventoryPermission(parent, args, context, info) {
  const response = await deleteInventoryPermission(
    context,
    args.userId,
    args.inventoryId,
    args.permission
  );
  return response;
}

export default {
  newInventory,
  editInventory,
  trashInventory,
  addStorageToInventory,
  removeStorageFromInventory,
  changeInventoryPermission,
  removeInventoryPermission
};

// async function createInventory(parent, args, context, info) {
//   const { userId } = context;
//   const inventory = await context.prisma.inventory.create({
//     data: {
//       name: args.name,
//       description: args.description,
//       createdById: userId,
//       editedById: userId
//     }
//   });

//   return { status: `${args.name} Created`, inventory };
// }

// async function createStorage(parent, args, context, info) {
//   const { userId } = context;
//   const storage = await context.prisma.storage.create({
//     data: {
//       name: args.name,
//       description: args.description,
//       createdById: userId,
//       editedById: userId
//     }
//   });
//   return { status: `${args.name} Created`, storage };
// }

// export default {
//   createInventory,
//   createStorage
// };
