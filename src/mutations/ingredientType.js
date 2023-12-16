async function addIngredientType(parent, args, context, info) {
  return await context.prisma.ingredientType.create({
    data: {
      name: args.name,
      description: args.description
    }
  });
}
async function addManyIngredientTypes(parent, args, context, info) {
  return await context.prisma.ingredientType.createMany({
    data: args.dat
  });
}

export default {
  addIngredientType,
  addManyIngredientTypes
};
