import completeTouch from "./Build.js";

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
  console.log(parent);
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

async function completeBuild(parent, args, context) {
  const basicBuilds = await context.prisma.build.findMany({
    where: { createdById: parent.id }
  });

  async function completeTouch(parent, args, context) {
    const basicTouches = await context.prisma.touch.findMany({
      where: { buildId: parent.id }
    });

    const completeTouches = await basicTouches.map(async basicTouch => {
      const genericIngredient =
        await context.prisma.genericIngredient.findUnique({
          where: { id: basicTouch.genericIngredientId }
        });
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
  const completeBuilds = await basicBuilds.map(async basicBuild => {
    const recipe = await context.prisma.recipe.findUnique({
      where: { id: basicBuild.recipeId }
    });
    const touches = await completeTouch(basicBuild, args, context);
    return {
      ...basicBuild,
      recipeName: recipe.name,
      recipeOrigin: recipe.origin,
      recipeHistory: recipe.history,
      completeTouch: touches
    };
  });
  console.log(completeBuilds);
  return completeBuilds;
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
};
