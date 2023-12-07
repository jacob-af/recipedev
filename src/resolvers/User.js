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

async function recipeBook(parent, args, context) {
  return await context.prisma.User.findUnique({
    where: { id: parent.id }
  }).recipeBook();
}

async function recipeBookUser(parent, args, context) {
  //console.log(parent);
  return await context.prisma.user
    .findUnique({
      where: { id: parent.id }
    })
    .recipeBookUser(parent.id);
}

async function inventory(parent, args, context) {
  return await context.prisma.User.findUnique({
    where: { id: parent.id }
  }).inventory();
}

async function completeTouch(parent, args, context) {
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

async function completeBuild(parent, args, context) {
  const userBuildIds = await context.prisma.buildUser.findMany({
    where: { userId: parent.id }
  });

  const completeBuilds = userBuildIds.map(async buildId => {
    const build = await context.prisma.build.findUnique({
      where: { id: buildId.buildId }
    });
    const recipe = await context.prisma.recipe.findUnique({
      where: { id: build.recipeId }
    });
    const touches = await completeTouch(build, args, context);
    console.log(build.buildName);
    return {
      ...build,
      recipeName: recipe.name,
      recipeOrigin: recipe.origin,
      recipeHistory: recipe.history,
      completeTouch: touches,
      permission: build.permission
    };
  });

  return completeBuilds;
}

async function buildUser(parent, args, context) {
  return await context.prisma.User.findUnique({
    where: { id: parent.id }
  }).buildUser();
}

// async function recipeStack(parent, args, context) {
//   const userBuildIds = await context.prisma.buildUser.findMany({
//     where: { userId: parent.id }
//   });
//   //console.log(userBuildIds);
//   const allUserRecipes = await userBuildIds
//     .map(async userBuildId => {
//       const build = await context.prisma.build.findUnique({
//         where: { id: userBuildId.buildId }
//       });
//       //console.log({ ...build, permission: userBuildId.permission });
//       return { ...build, permission: userBuildId.permission };
//     })
//     .reduce(restructure, []);

//   function restructure(accumulator, currentvalue) {
//     if (accumulator.findIndex(i => i.recipeId === -1)) {
//       accumulator.push({
//         recipeId: currentvalue.recipeId,
//         builds: [currentvalue]
//       });
//     } else {
//       accumulator.i.builds.push(currentvalue);
//     }
//     return accumulator;
//   }

//   return allUserRecipes;
// }

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
