async function createInventory(parent, args, context, info) {
  const { userId } = context;
  const inventory = await context.prisma.inventory.create({
    data: {
      name: args.name,
      description: args.description,
      createdById: userId,
      editedById: userId
    }
  });

  return { status: `${args.name} Created`, inventory };
}

async function createStorage(parent, args, context, info) {
  const { userId } = context;
  const storage = await context.prisma.storage.create({
    data: {
      name: args.name,
      description: args.description,
      createdById: userId,
      editedById: userId
    }
  });
  return { status: `${args.name} Created`, storage };
}

export default {
  createInventory,
  createStorage
};
