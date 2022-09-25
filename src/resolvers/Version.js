function postedBy(parent, args, context) {
  return context.prisma.version
    .findUnique({
      where: { id: parent.id }
    })
    .postedBy();
}

function recipe(parent, args, context) {
  return context.prisma.version
    .findUnique({ where: { id: parent.id } })
    .recipe();
}

function specs(parent, args, context) {
  console.log(parent);
  const idToPass = parent.id || parent.versionId;
  return context.prisma.version.findUnique({ where: { id: idToPass } }).specs();
}

async function sharedVersion(parent, args, context) {
  let results = await context.prisma.sharedVersion.findMany({
    where: { versionId: parent.id }
  });
  console.log(results);
  return results.map(result =>
    context.prisma.users.findUnique({ where: { id: result.userId } })
  );
}

async function adminOnVersion(parent, args, context) {
  let results = await context.prisma.adminOnVersion.findMany({
    where: { versionId: parent.id }
  });
  console.log(results);
  return results.map(result =>
    context.prisma.users.findUnique({ where: { id: result.userId } })
  );
}

module.exports = {
  postedBy,
  recipe,
  specs,
  sharedVersion,
  adminOnVersion
};
