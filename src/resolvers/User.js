function recipe(parent, args, context) {
  return context.prisma.User.findUnique({
    where: { id: parent.id }
  }).recipes();
}

async function specificIngredient(parent, args, context) {
  let results = await context.prisma.specificIngredient.findMany({
    where: { createdById: parent.id }
  });
  return results;
}

function build(parent, args, context) {
  return context.prisma.User.findUnique({
    where: { id: parent.id }
  }).build();
}

async function recipeBook(parent, args, context) {
  return await context.prisma.User.findUnique({
    where: { id: parent.id }
  }).recipeBook();
}

// async function sharedRecipeBook(parent, args, context) {
//   let results = await context.prisma.sharedRecipeBook.findMany({
//     where: { userId: parent.id }
//   });
//   console.log(results);
//   return results.map(result =>
//     context.prisma.recipeBook.findUnique({ where: { id: result.recipeBookId } })
//   );
// }

// async function adminOnRecipeBook(parent, args, context) {
//   let results = await context.prisma.adminOnRecipeBook.findMany({
//     where: { userId: parent.id }
//   });
//   console.log(results);
//   return results.map(result =>
//     context.prisma.recipeBook.findUnique({ where: { id: result.recipeBookId } })
//   );
// }

// async function userBuild(parent, args, context) {
//   let results = await context.prisma.sharedBuild.findMany({
//     where: { userId: parent.id }
//   });
//   console.log(results);
//   return results.map(result =>
//     context.prisma.build.findUnique({ where: { id: result.buildId } })
//   );
// }

// async function recipeBook(parent, args, context) {
//   const recipeBooks = await context.prisma.user
//     .findUnique({
//       where: { id: parent.id }
//     })
//     .recipeBook();
//   const sharedRecipeBookList = await context.prisma.user
//     .findUnique({
//       where: { id: parent.id }
//     })
//     .sharedRecipeBook();
//   const sharedRecipeBooks = await context.prisma.$transaction(
//     sharedRecipeBookList.map(result =>
//       context.prisma.recipeBook.findUnique({
//         where: { id: result.recipeBookId }
//       })
//     )
//   );
//   const allBooks = recipeBooks.concat(sharedRecipeBooks);
//   //console.log(allBooks);
//   return allBooks;
// }

// async function allBuild(parent, args, context) {
//   const userBuilds = await context.prisma.user
//     .findUnique({
//       where: { id: parent.id }
//     })
//     .build();
//   //console.log(userBuilds);
//   const sharedBuildIds = await context.prisma.sharedBuild.findMany({
//     where: { userId: parent.id }
//   });

//   const books = await allBooks(parent, args, context);
//   //console.log(books);
//   const bookBuilds = await context.prisma.$transaction(
//     books.map(result =>
//       context.prisma.recipeBookBuild.findMany({
//         where: { recipeBookId: result.id }
//       })
//     )
//   );
//   const mostBuildIds = sharedBuildIds.concat(...bookBuilds);
//   console.log(mostBuildIds);
//   const sharedBuilds = await context.prisma.$transaction(
//     mostBuildIds.map(result =>
//       context.prisma.build.findUnique({ where: { id: result.buildId } })
//     )
//   );
//   const allBuilds = userBuilds.concat(sharedBuilds);
//   return allBuilds;
// }

module.exports = {
  recipe,
  specificIngredient,
  build,
  recipeBook
  //userBuild,
  //allBuild,
  //recipeBook,
  //sharedRecipeBook,
  //adminOnRecipeBook
};
