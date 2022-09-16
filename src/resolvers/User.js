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

module.exports = {
  recipes,
  ingredients
};
