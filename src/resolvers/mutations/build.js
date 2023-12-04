// addBuild;
// editBuild;
// deleteBuild;

// addRecipeToRecipeBook;
// deleteRecipeFromRecipeBook;

// addBuildPermission;
// editBuildPermission;
// deleteBuildPermission;

async function addBuild(parent, args, context, info) {
  const { userId } = context;
  const touchArrayWithId = args.touchArray.map((touch, index) => {
    return {
      order: index,
      genericIngredientId: touch.genericIngredientId,
      specificIngredientId: touch.specificIngredientId,
      amount: touch.amount,
      unit: touch.unit
    };
  });
  const build = await context.prisma.build.create({
    data: {
      recipe: { connect: { id: args.recipe } },
      buildName: args.buildName,
      instructions: args.instructions,
      glassware: args.glassware,
      ice: args.ice,
      createdBy: { connect: { id: userId } },
      editedBy: { connect: { id: userId } },
      touch: {
        create: touchArrayWithId
      }
    }
  });
  console.log(build);
  const buildUser = await context.prisma.buildUser.create({
    data: {
      build: { connect: { id: build.id } },
      user: { connect: { id: userId } },
      permission: "Owner"
    }
  });
  return {
    build: build,
    status: `${build.buildName} Created, permission level ${buildUser.permission}`
  };
}

async function updateBuild(parent, args, context, info) {
  const spec = await context.prisma.spec.update({
    where: {
      id: args.specId
    },
    data: {
      recipe: { connect: { id: args.recipeId } },
      specName: args.specName,
      instructions: args.instructions,
      glassware: args.glassware,
      ice: args.ice
    }
  });
  return spec;
}

async function updateSingleTouch(parent, args, context, info) {
  console.log(context.prisma.touch_id_seq);
  return await context.prisma.touch.upsert({
    where: { id: args.input.id },
    update: {
      order: args.input.order,
      ingredientId: args.input.ingredientId,
      amount: args.input.amount,
      unit: args.input.unit
    },
    create: {
      specId: args.specId,
      order: args.input.order,
      ingredientId: args.input.ingredientId,
      amount: args.input.amount,
      unit: args.input.unit
    }
  });
}

async function updateTouch(parent, args, context, info) {
  await context.prisma.touch.deleteMany({
    where: { specId: args.specId }
  });
  console.log(args.input);
  return await context.prisma.$transaction(
    args.input.map((touch, index) =>
      context.prisma.touch.create({
        data: {
          specId: args.specId,
          order: index,
          ingredientId: touch.ingredientId,
          amount: touch.amount,
          unit: touch.unit
        }
      })
    )
  );
}

export default {
  addBuild
};
