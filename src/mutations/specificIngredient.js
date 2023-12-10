async function addSpecificIngredient(parent, args, context, info) {
  const { userId } = context;

  return await context.prisma.specificIngredient.create({
    data: {
      name: args.name,
      description: args.description,
      amount: args.amount,
      unit: args.unit,
      price: args.price,
      source: args.source,
      genericIngredientId: args.genericIngredientId,
      createdById: userId
    }
  });
}

export default {
  addSpecificIngredient
};
