async function createTouchArray(context, buildId, touchArray, version) {
  const newTouchArray = await touchArray.map(async (touch, index) => {
    const newTouch = await context.prisma.touch.create({
      data: {
        buildId,
        order: index,
        genericIngredientId: touch.genericIngredientId,
        specificIngredientId: touch.specificIngredientId,
        amount: touch.amount,
        unit: touch.unit,
        version
      }
    });
    return newTouch;
  });
  return newTouchArray;
}

async function archiveTouchArray(context, buildId, version) {
  const touchToArchive = await context.prisma.touch.findMany({
    where: {
      buildId,
      version
    }
  });

  const archivedTouchArray = touchToArchive.map(async (touch, index) => {
    return await context.prisma.archivedTouch.create({
      data: {
        buildId,
        order: index,
        genericIngredientId: touch.genericIngredientId,
        specificIngredientId: touch.specificIngredientId,
        amount: touch.amount,
        unit: touch.unit,
        version
      }
    });
  });

  const deletedArray = touchToArchive.map(async (touch, index) => {
    return context.prisma.touch.delete({
      where: { id: touch.id }
    });
  });
  console.log(deletedArray);
  return archivedTouchArray;
}

export { createTouchArray, archiveTouchArray };
