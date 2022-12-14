function postedBy(parent, args, context) {
  return context.prisma.spec
    .findUnique({
      where: { id: parent.id }
    })
    .postedBy();
}

function recipe(parent, args, context) {
  return context.prisma.spec.findUnique({ where: { id: parent.id } }).recipe();
}

function touch(parent, args, context) {
  console.log(parent);
  const idToPass = parent.id || parent.specId;
  return context.prisma.spec.findUnique({ where: { id: idToPass } }).touch();
}

async function sharedSpec(parent, args, context) {
  let results = await context.prisma.sharedSpec.findMany({
    where: { specId: parent.id }
  });
  console.log(results);
  return results.map(result =>
    context.prisma.user.findUnique({ where: { id: result.userId } })
  );
}

async function adminOnSpec(parent, args, context) {
  let results = await context.prisma.adminOnSpec.findMany({
    where: { specId: parent.id }
  });
  console.log(results);
  return results.map(result =>
    context.prisma.user.findUnique({ where: { id: result.userId } })
  );
}

async function recipeBookSpec(parent, args, context) {
  console.log("ding");
  let results = await context.prisma.recipeBookSpec.findMany({
    where: { specId: parent.id }
  });
  console.log(results);
  return results.map(result =>
    context.prisma.spec.findUnique({ where: { id: result.specId } })
  );
}

module.exports = {
  postedBy,
  recipe,
  touch,
  sharedSpec,
  adminOnSpec,
  recipeBookSpec
};
