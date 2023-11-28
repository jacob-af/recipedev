function createdBy(parent, args, context) {
  return context.prisma.recipeBook
    .findUnique({
      where: { id: parent.id }
    })
    .createdBy();
}

async function build(parent, args, context) {
  let results = await context.prisma.recipeBookbuild.findMany({
    where: { recipeBookId: parent.id }
  });
  console.log(results);
  return results.map(result =>
    context.prisma.build.findUnique({ where: { id: result.buildId } })
  );
}

export default {
  build,
  createdBy
};
