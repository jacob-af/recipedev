function createdBy(parent, args, context) {
  return context.prisma.spec
    .findUnique({
      where: { id: parent.id }
    })
    .createdBy();
}

function recipe(parent, args, context) {
  return context.prisma.recipe.findUnique({ where: { id: parent.recipeId } });
}

function touch(parent, args, context) {
  const idToPass = parent.id || parent.buildId;
  return context.prisma.touch.findMany({ where: { buildId: parent.id } });
}

async function completeTouch(parent, args, context) {
  const basicTouches = await context.prisma.touch.findMany({
    where: { buildId: parent.id }
  });
  const completeTouches = await basicTouches.map(async basicTouch => {
    const genericIngredient =
      await context.prisma.genericIngredientId.findUnique({
        where: { id: basicTouch.genericIngedientId }
      });
    if (basicTouch.specificIngredientId) {
      const specificIngredient = context.prisma.specificIngredientId.findUnique(
        {
          where: { id: basicTouch.specificIngedientId }
        }
      );
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

export default {
  createdBy,
  recipe,
  touch,
  completeTouch
};
