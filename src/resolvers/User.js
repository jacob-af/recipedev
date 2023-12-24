async function following(parent, args, context) {
  const followDatum = await context.prisma.follow.findMany({
    where: { followedById: parent.id }
  });

  const user = await followDatum.map(async followData => {
    if (followData.followingId) {
      return await context.prisma.user.findUnique({
        where: { id: followData.followingId }
      });
    }
  });
  return user;
}

async function followedBy(parent, args, context) {
  const followDatum = await context.prisma.follow.findMany({
    where: { followingId: parent.id }
  });

  const user = await followDatum.map(async followData => {
    if (followData.followedById) {
      return await context.prisma.user.findUnique({
        where: { id: followData.followedById }
      });
    }
  });
  return user;
}

function myBuild(parent, args, context) {
  return context.prisma.User.findUnique({
    where: { id: parent.id }
  }).build();
}

async function allBuild(parent, args, context) {
  const buildUser = await context.prisma.buildUser.findMany({
    where: { userId: parent.id }
  });
  console.log(buildUser);
  return buildUser.map(async each => {
    const build = await context.prisma.build.findUnique({
      where: { id: each.buildId }
    });
    return {
      ...build,
      permission: each.permission
    };
  });
}

function myCrew(parent, args, context) {
  return context.prisma.User.findUnique({
    where: { id: parent.id }
  }).crew();
}

async function allCrew(parent, args, context) {
  const all = await context.prisma.crewUser.findMany({
    where: { userId: parent.id }
  });
  return all.map(async each => {
    const crew = await context.prisma.crew.findUnique({
      where: { id: each.crewId }
    });
    return {
      ...crew,
      permission: each.permission
    };
  });
}

function myIngredient(parent, args, context) {
  return context.prisma.User.findUnique({
    where: { id: parent.id }
  }).ingredient();
}

async function allIngredient(parent, args, context) {
  const ingredientUser = await context.prisma.ingredientUser.findMany({
    where: { userId: parent.id }
  });
  console.log(ingredientUser);
  return ingredientUser.map(each => {
    const ingredient = context.prisma.ingredient.findUnique({
      where: { id: each.ingredientId }
    });
    return {
      ...ingredient,
      permission: each.permission
    };
  });
}

function myInventory(parent, args, context) {
  const inv = context.prisma.User.findUnique({
    where: { id: parent.id }
  });
  console.log(inv);
  return inv.inventory();
}

async function allInventory(parent, args, context) {
  const inventoryUser = await context.prisma.inventoryUser.findMany({
    where: { userId: parent.id }
  });
  return inventoryUser.map(async each => {
    const inventory = await context.prisma.inventory.findUnique({
      where: { id: each.inventoryId }
    });
    return {
      ...inventory,
      permission: each.permission
    };
  });
}

function myRecipe(parent, args, context) {
  return context.prisma.User.findUnique({
    where: { id: parent.id }
  }).recipe();
}

async function myRecipeBook(parent, args, context) {
  const recipeBookIds = await context.prisma.recipeBookUser.findMany({
    where: { userId: parent.id }
  });
}

async function allRecipeBook(parent, args, context) {
  const recipeBookId = await context.prisma.recipeBookUser.findMany({
    where: { userId: parent.id }
  });
  return recipeBookId.map(async each => {
    const recipeBook = await context.prisma.recipeBook.findUnique({
      where: { id: each.recipeBookId }
    });
    return {
      ...recipeBook,
      permission: each.permission
    };
  });
}

function myStorage(parent, args, context) {
  return context.prisma.User.findUnique({
    where: { id: parent.id }
  }).storage();
}
async function allStorage(parent, args, context) {
  const storageIds = await context.prisma.storageUser.findMany({
    where: { userId: parent.id }
  });
  return storageIds.map(async each => {
    const storage = await context.prisma.storage.findUnique({
      where: { id: each.storageId }
    });
    return {
      ...storage,
      permission: each.permission
    };
  });
}

async function completeBuild(parent, args, context) {
  const userBuildIds = await context.prisma.allBuild.findMany({
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

export default {
  following,
  followedBy,
  myRecipeBook,
  allRecipeBook,
  myRecipe,
  myBuild,
  allBuild,
  completeBuild,
  allIngredient,
  myInventory,
  allInventory,
  allCrew,
  myCrew,
  myStorage,
  allStorage,
  myIngredient
};
