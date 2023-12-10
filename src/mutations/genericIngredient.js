async function addGenericIngredient(parent, args, context, info) {
  return await context.prisma.genericIngredient.create({
    data: {
      name: args.name,
      description: args.description
    }
  });
}
async function addManyGenericIngredients(parent, args, context, info) {
  return await context.prisma.genericIngredient.createMany({
    data: args.dat
  });
}

export default {
  addGenericIngredient,
  addManyGenericIngredients
};
