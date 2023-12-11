function allCrews(parent, args, context) {
  return context.prisma.crew.findMany({});
}

function allUsers(parent, args, context) {
  return context.prisma.user.findMany({});
}

function allRecipes(parent, args, context) {
  return context.prisma.recipe.findMany({});
}

function allRecipeBooks(parent, args, context) {
  return context.prisma.recipeBook.findMany({});
}

function allRecipeBookUsers(parent, args, context) {
  return context.prisma.recipeBookUser.findMany({});
}

function allGenericIngredients(parent, args, context) {
  return context.prisma.genericIngredient.findMany({});
}

function allSpecificIngredients(parent, args, context) {
  return context.prisma.specificIngredient.findMany({});
}
function allTouches(parent, args, context) {
  return context.prisma.touch.findMany({});
}
function allBuilds(parent, args, context) {
  return context.prisma.build.findMany({});
}

async function completeBuild(parent, args, context) {
  const userBuildIds = await context.prisma.buildUser.findMany({
    where: { userId: args.userId || context.userId }
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

async function userRecipeBook(parent, args, context) {
  const recipeBookIds = await context.prisma.recipeBookUser.findMany({
    where: { userId: args.userId || context.userId }
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

export default {
  allCrews,
  allUsers,
  allRecipes,
  allGenericIngredients,
  allSpecificIngredients,
  allRecipeBookUsers,
  allTouches,
  allBuilds,
  allRecipeBooks,
  completeBuild,
  userRecipeBook
};
