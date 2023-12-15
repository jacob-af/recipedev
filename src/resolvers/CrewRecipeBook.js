function recipeBook(parent, args, context) {
  console.log("ding");
  return context.prisma.recipeBook.findUnique({
    where: { id: parent.recipeBookId }
  });
}

function crew(parent, args, context) {
  console.log("ding");
  return context.prisma.crew.findUnique({
    where: { id: parent.crewId }
  });
}

export default {
  recipeBook,
  crew
};
