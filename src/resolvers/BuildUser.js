function user(parent, args, context) {
  console.log("ding");
  return context.prisma.user.findUnique({
    where: { id: parent.userId }
  });
}

function build(parent, args, context) {
  console.log("ding");
  return context.prisma.build.findUnique({
    where: { id: parent.buildId }
  });
}

export default {
  user,
  build
};
