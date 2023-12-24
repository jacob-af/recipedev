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

function allIngredientTypes(parent, args, context) {
  return context.prisma.ingredientType.findMany({
    orderBy: { name: "asc" }
  });
}

async function allIngredients(parent, args, context) {
  const ingredientList = await context.prisma.ingredientUser.findMany({
    where: { userId: args.userId || context.userId }
  });
  const ingredients = await ingredientList.map(async ingredient => {
    const ing = await context.prisma.ingredient.findUnique({
      where: { id: ingredient.ingredientId }
    });
    return {
      ...ing,
      permission: ingredient.permission
    };
  });
  return ingredients;
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
      about: recipe.about,
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
    const ingredientType = await context.prisma.ingredientType.findUnique({
      where: { id: basicTouch.ingredientTypeId }
    });
    if (basicTouch.ingredientId) {
      const ingredient = await context.prisma.ingredient.findUnique({
        where: { id: basicTouch.ingredientId }
      });

      return {
        ...basicTouch,
        ingredientTypeName: ingredientType.name,
        ingredientTypeDescription: ingredientType.description,
        ingredientName: ingredient.name,
        ingredientDescription: ingredient.description,
        cost: ingredient.amount / ingredient.price
      };
    }

    return {
      ...basicTouch,
      ingredientTypeName: ingredientType.name,
      ingredientTypeDescription: ingredientType.description
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
  allIngredientTypes,
  allIngredients,
  allRecipeBookUsers,
  allTouches,
  allBuilds,
  allRecipeBooks,
  completeBuild,
  userRecipeBook
};
