function ingredient(parent, args, context) {
  console.log("ding");
  return context.prisma.specificIngredient.findUnique({
    where: { id: parent.ingredientId }
  });
}

function crew(parent, args, context) {
  console.log("ding");
  return context.prisma.crew.findUnique({
    where: { id: parent.crewId }
  });
}

export default {
  ingredient,
  crew
};
