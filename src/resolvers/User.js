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
  let results = await context.prisma.sharedRecipeBook.findMany({
    where: { userId: parent.id }
  });
  console.log(results);
  return results.map(result =>
    context.prisma.recipeBook.findUnique({ where: { id: result.recipeBookId } })
  );
}

async function adminOnRecipeBook(parent, args, context) {
  let results = await context.prisma.adminOnRecipeBook.findMany({
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
  const results = await context.prisma.adminOnSpec.findMany({
    where: { userId: parent.id }
  });
  console.log(results);
  return results.map(result =>
    context.prisma.spec.findUnique({ where: { id: result.specId } })
  );
}

async function allBooks(parent, args, context) {
  const recipeBooks = await context.prisma.user
    .findUnique({
      where: { id: parent.id }
    })
    .recipeBook();
  const sharedRecipeBookList = await context.prisma.user
    .findUnique({
      where: { id: parent.id }
    })
    .sharedRecipeBook();
  const sharedRecipeBooks = await context.prisma.$transaction(
    sharedRecipeBookList.map(result =>
      context.prisma.recipeBook.findUnique({
        where: { id: result.recipeBookId }
      })
    )
  );
  const allBooks = recipeBooks.concat(sharedRecipeBooks);
  //console.log(allBooks);
  return allBooks;
}

async function allSpec(parent, args, context) {
  const userSpecs = await context.prisma.user
    .findUnique({
      where: { id: parent.id }
    })
    .spec();
  //console.log(userSpecs);
  const sharedSpecIds = await context.prisma.sharedSpec.findMany({
    where: { userId: parent.id }
  });

  const books = await allBooks(parent, args, context);
  //console.log(books);
  const bookSpecs = await context.prisma.$transaction(
    books.map(result =>
      context.prisma.recipeBookSpec.findMany({
        where: { recipeBookId: result.id }
      })
    )
  );
  const mostSpecIds = sharedSpecIds.concat(...bookSpecs);
  console.log(mostSpecIds);
  const sharedSpecs = await context.prisma.$transaction(
    mostSpecIds.map(result =>
      context.prisma.spec.findUnique({ where: { id: result.specId } })
    )
  );
  const allSpecs = userSpecs.concat(sharedSpecs);
  return allSpecs;
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
  allBooks,
  allSpec,
  recipeBook,
  sharedRecipeBook,
  adminOnRecipeBook
};
