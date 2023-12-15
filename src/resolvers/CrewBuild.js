function build(parent, args, context) {
  console.log("ding");
  return context.prisma.build.findUnique({
    where: { id: parent.buildId }
  });
}

function crew(parent, args, context) {
  console.log("ding");
  return context.prisma.crew.findUnique({
    where: { id: parent.crewId }
  });
}

export default {
  build,
  crew
};
