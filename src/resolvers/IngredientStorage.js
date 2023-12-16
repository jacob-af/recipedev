function storage(parent, args, context) {
  console.log("ding");
  return context.prisma.storage.findUnique({
    where: { id: parent.storageId }
  });
}

function ingredient(parent, args, context) {
  console.log("ding");
  return context.prisma.ingredient.findUnique({
    where: { id: parent.ingredientId }
  });
}

export default {
  storage,
  ingredient
};
