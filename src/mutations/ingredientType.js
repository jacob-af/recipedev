async function addIngredientType(parent, args, context, info) {
  return await context.prisma.ingredientType.create({
    data: {
      name: args.name,
      description: args.description
    }
  });
}
async function addManyIngredientTypes(parent, args, context, info) {
  let successes = [];
  let errors = [];
  await args.dat.forEach(async ingredient => {
    try {
      const result = await context.prisma.ingredientType.upsert({
        where: {
          name: ingredient.name
        },
        update: {
          description: ingredient.description
        },
        create: {
          name: ingredient.name,
          description: ingredient.description
        }
      });
      successes.push(result);
    } catch (err) {
      console.log(err.message);
      errors.push(ingredient.name);
    }
  });
  console.log(successes, errors);
  if (successes.length > 0 && errors.length === 0) {
    return {
      code: "success",
      message: `Successfully added ${successes.length} ingredients with no errors`
    };
  } else if (successes.length > 0 && errors.length === 0) {
    return {
      code: "success",
      message: `Successfully added ${successes} ingredients. The following ingredients  count not be added: ${errors.join(
        ", "
      )}.`
    };
  } else {
    return {
      code: "failure",
      message: "something has gone horrifically wrong"
    };
  }
}

export default {
  addIngredientType,
  addManyIngredientTypes
};
