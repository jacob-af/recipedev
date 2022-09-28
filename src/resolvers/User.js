function recipe(parent, args, context) {
  return context.prisma.User.findUnique({
    where: { id: parent.id }
  }).recipes();
}

function ingredient(parent, args, context) {
  return context.prisma.User.findUnique({
    where: { id: parent.id }
  }).ingredients();
}

function spec(parent, args, context) {
  return context.prisma.User.findUnique({
    where: { id: parent.id }
  }).spec();
}

async function recipeBook(parent, args, context) {
  return await context.prisma.User.findUnique({
    where: { id: parent.id }
  }).recipeBook();
}

async function sharedRecipeBook(parent, args, context) {
  let results = await context.prisma.sharedrecipeBook.findMany({
    where: { userId: parent.id }
  });
  console.log(results);
  return results.map(result =>
    context.prisma.recipeBook.findUnique({ where: { id: result.recipeBookId } })
  );
}

async function adminOnRecipeBook(parent, args, context) {
  let results = await context.prisma.adminOnrecipeBook.findMany({
    where: { userId: parent.id }
  });
  console.log(results);
  return results.map(result =>
    context.prisma.recipeBook.findUnique({ where: { id: result.recipeBookId } })
  );
}

async function sharedSpec(parent, args, context) {
  let results = await context.prisma.sharedSpec.findMany({
    where: { userId: parent.id }
  });
  console.log(results);
  return results.map(result =>
    context.prisma.spec.findUnique({ where: { id: result.specId } })
  );
}

async function adminOnSpec(parent, args, context) {
  let results = await context.prisma.adminOnSpec.findMany({
    where: { userId: parent.id }
  });
  console.log(results);
  return results.map(result =>
    context.prisma.spec.findUnique({ where: { id: result.specId } })
  );
}

function touch(parent, args, context) {
  return context.prisma.User.findUnique({
    where: { id: parent.id }
  }).touch();
}

module.exports = {
  recipe,
  ingredient,
  spec,
  touch,
  sharedSpec,
  adminOnSpec,
  recipeBook,
  sharedRecipeBook,
  adminOnRecipeBook
};
