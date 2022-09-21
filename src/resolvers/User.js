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

function sharedVersions(parent, args, context) {
  return context.prisma.Users.findUnique({
    where: { userId: parent.id }
  }).sharedVersions();
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
  sharedVersions
};
