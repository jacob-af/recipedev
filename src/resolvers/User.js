function recipe(parent, args, context) {
  return context.prisma.User.findUnique({
    where: { id: parent.id }
  }).recipe();
}

function build(parent, args, context) {
  return context.prisma.User.findUnique({
    where: { id: parent.id }
  }).build();
}
function specificIngredient(parent, args, context) {
  return context.prisma.User.findUnique({
    where: { id: parent.id }
  }).ingredient();
}

// async function recipeBook(parent, args, context) {
//   return await context.prisma.User.findUnique({
//     where: { id: parent.id }
//   }).recipeBook();
// }

async function recipeBook(parent, args, context) {
  const recipeBookIds = await context.prisma.recipeBookUser.findMany({
    where: { userId: parent.id }
  });

  const recipeBooks = await recipeBookIds.map(async recipeBookId => {
    const recipeBook = await context.prisma.recipeBook.findUnique({
      where: { id: recipeBookId.recipeBookId }
    });
    const buildIds = await context.prisma.recipeBookBuild.findMany({
      where: { recipeBookId: recipeBook.id }
    });

    const builds = await completeBuilds(buildIds, context);
    return {
      ...recipeBook,
      completeBuild: builds
    };
  });
  return recipeBooks;
}

async function recipeBookUser(parent, args, context) {
  return await context.prisma.recipeBookUser.findMany({
    where: { userId: parent.id }
  });
}

async function inventory(parent, args, context) {
  return await context.prisma.User.findUnique({
    where: { id: parent.id }
  }).inventory();
}

async function completeBuild(parent, args, context) {
  const userBuildIds = await context.prisma.buildUser.findMany({
    where: { userId: parent.id }
  });

  return completeBuilds(userBuildIds, context);
}

async function completeBuilds(buildIds, context) {
  const completeBuilds = buildIds.map(async buildId => {
    const build = await context.prisma.build.findUnique({
      where: { id: buildId.buildId }
    });
    const recipe = await context.prisma.recipe.findUnique({
      where: { id: build.recipeId }
    });
    const touches = await completeTouch(build, context);
    return {
      ...build,
      recipeName: recipe.name,
      recipeOrigin: recipe.origin,
      recipeHistory: recipe.history,
      completeTouch: touches,
      permission: buildId.permission
    };
  });
  return completeBuilds;
}

async function completeTouch(parent, context) {
  const basicTouches = await context.prisma.touch.findMany({
    where: { buildId: parent.id }
  });

  const completeTouches = await basicTouches.map(async basicTouch => {
    const genericIngredient = await context.prisma.genericIngredient.findUnique(
      {
        where: { id: basicTouch.genericIngredientId }
      }
    );
    if (basicTouch.specificIngredientId) {
      const specificIngredient =
        await context.prisma.specificIngredient.findUnique({
          where: { id: basicTouch.specificIngredientId }
        });

      return {
        ...basicTouch,
        genericIngredientName: genericIngredient.name,
        genericIngredientDescription: genericIngredient.description,
        specificIngredientName: specificIngredient.name,
        specificIngredientDescription: specificIngredient.description,
        cost: specificIngredient.amount / specificIngredient.price
      };
    }

    return {
      ...basicTouch,
      genericIngredientName: genericIngredient.name,
      genericIngredientDescription: genericIngredient.description
    };
  });
  return completeTouches;
}

async function buildUser(parent, args, context) {
  return await context.prisma.User.findUnique({
    where: { id: parent.id }
  }).buildUser();
}

export default {
  recipe,
  specificIngredient,
  build,
  recipeBook,
  recipeBookUser,
  inventory,
  completeBuild,
  buildUser
  //recipeStack
};
