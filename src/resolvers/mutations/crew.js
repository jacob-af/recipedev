async function createCrew(parent, args, context, info) {
  const { userId } = context;
  const crew = await context.prisma.crew.create({
    data: {
      name: args.name,
      description: args.description,
      createdById: userId,
      editedById: userId
    }
  });
  return { status: `${args.name} Created`, crew };
}

export default {
  createCrew
};
