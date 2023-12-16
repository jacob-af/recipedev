// addRecipeBook;
// editRecipeBook;
// deleteRecipeBook;
// addRecipeBookPermission;
// editRecipeBookPermission;
// deleteRecipeBookPermission;

async function addRecipe(parent, args, context, info) {
  const { userId } = context;
  const recipe = await context.prisma.recipe.create({
    data: {
      name: args.name,
      origin: args.origin,
      history: args.history,
      createdById: userId,
      editedById: userId
    }
  });
  const argsWithRecipeId = {
    ...args,
    recipeId: recipe.id
  };
  console.log(addBuild);
  const { build, status } = await addBuild(
    parent,
    argsWithRecipeId,
    context,
    info
  );

  return { recipe, build };
}

async function addBuild(parent, args, context, info) {
  const { userId } = context;
  const touchArrayWithId = args.touchArray.map((touch, index) => {
    return {
      order: index,
      ingredientTypeId: touch.ingredientTypeId,
      ingredientId: touch.ingredientId,
      amount: touch.amount,
      unit: touch.unit
    };
  });
  const build = await context.prisma.build.create({
    data: {
      recipeId: args.recipeId,
      buildName: args.buildName,
      instructions: args.instructions,
      glassware: args.glassware,
      ice: args.ice,
      createdById: userId,
      editedById: userId,
      touch: {
        create: touchArrayWithId
      }
    }
  });
  const buildUser = await context.prisma.buildUser.create({
    data: {
      build: { connect: { id: build.id } },
      user: { connect: { id: userId } },
      permission: "Owner"
    }
  });
  //   const recipeBookBuild = await context.prisma.recipeBookBuild.create({
  //     data: {
  //         build: build.id,
  //         recipeBook:
  //     }
  //   })
  return {
    build: build,
    status: `${build.buildName} Created, permission level ${buildUser.permission}`
  };
}

export default { addRecipe };
