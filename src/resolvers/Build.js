function createdBy(parent, args, context) {
  return context.prisma.spec
    .findUnique({
      where: { id: parent.id }
    })
    .createdBy();
}

function recipe(parent, args, context) {
  return context.prisma.recipe
    .findUnique({ where: { id: parent.id } })
    .recipe();
}

function touch(parent, args, context) {
  console.log(parent);
  const idToPass = parent.id || parent.buildId;
  return context.prisma.touch.findMany({ where: { buildId: parent.id } });
}

// async function adminOnSpec(parent, args, context) {
//   let results = await context.prisma.adminOnSpec.findMany({
//     where: { specId: parent.id }
//   });
//   console.log(results);
//   return results.map(result =>
//     context.prisma.user.findUnique({ where: { id: result.userId } })
//   );
// }

// async function recipeBookSpec(parent, args, context) {
//   console.log("ding");
//   let results = await context.prisma.recipeBookSpec.findMany({
//     where: { specId: parent.id }
//   });
//   console.log(results);
//   return results.map(result =>
//     context.prisma.spec.findUnique({ where: { id: result.specId } })
//   );
// }

export default {
  createdBy,
  recipe,
  touch
};
