function createdBy(parent, args, context) {
  return context.prisma.spec
    .findUnique({
      where: { id: parent.id }
    })
    .createdBy();
}

function archivedBuild(parent, args, context) {
  return context.prisma.archivedBuild.findMany({
    where: { buildId: parent.id }
  });
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
    const ingredientType = await context.prisma.ingredientTypeId.findUnique({
      where: { id: basicTouch.ingredientTypeId }
    });
    if (basicTouch.ingredientId) {
      const ingredient = context.prisma.ingredientId.findUnique({
        where: { id: basicTouch.specificIngedientId }
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
  createdBy,
  archivedBuild,
  recipe,
  touch,
  completeTouch
};
