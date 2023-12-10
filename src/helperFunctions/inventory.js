import { resolvePermission } from "./utils";

async function newInventory(context, name, description, userId) {
  const inventory = await context.prisma.inventory.create({
    data: {
      name: args.name,
      description: args.description,
      createdById: userId,
      editedById: userId
    }
  });
  const inventoryUser = shareInventory(
    context,
    userId,
    inventory.id,
    "Onwer",
    "Owner"
  );
  return inventory;
}

async function shareInventory(
  context,
  userId,
  inventoryId,
  userPermission,
  permission
) {
  if (resolvePermission(userPermission, permission)) {
    const inventoryUser = await context.prisma.inventoryUser.create({
      data: {
        userId,
        inventoryId,
        permission
      }
    });
    return inventoryUser;
  }
}

export { newInventory, shareInventory };
