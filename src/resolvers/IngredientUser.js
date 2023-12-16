function user(parent, args, context) {
  console.log("ding");
  return context.prisma.user.findUnique({
    where: { id: parent.userId }
  });
}

function ingredient(parent, args, context) {
  console.log("ding");
  return context.prisma.ingredient.findUnique({
    where: { id: parent.ingredientId }
  });
}

export default {
  user,
  ingredient
};
