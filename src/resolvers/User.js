function recipes(parent, args, context) {
  return context.prisma.Users.findUnique({
    where: { id: parent.id }
  }).recipes();
}

function ingredients(parent, args, context) {
  return context.prisma.Users.findUnique({
    where: { id: parent.id }
  }).ingredients();
}

function versions(parent, args, context) {
  return context.prisma.Users.findUnique({
    where: { id: parent.id }
  }).version();
}

async function sharedVersions(parent, args, context) {
  let results = await context.prisma.sharedVersion.findMany({
    where: { userId: parent.id }
  });
  console.log(results);
  return results.map(result =>
    context.prisma.version.findUnique({ where: { id: result.versionId } })
  );
}

async function adminOnVersion(parent, args, context) {
  let results = await context.prisma.adminOnVersion.findMany({
    where: { userId: parent.id }
  });
  console.log(results);
  return results.map(result =>
    context.prisma.version.findUnique({ where: { id: result.versionId } })
  );
}

function specs(parent, args, context) {
  return context.prisma.Users.findUnique({
    where: { id: parent.id }
  }).spec();
}

module.exports = {
  recipes,
  ingredients,
  versions,
  specs,
  sharedVersions,
  adminOnVersion
};
