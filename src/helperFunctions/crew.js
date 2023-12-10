import { resolvePermission } from "./utils";

async function newCrew(context, name, description, userId) {
  const inventory = await context.prisma.crew.create({
    data: {
      name: args.name,
      description: args.description,
      createdById: userId,
      editedById: userId
    }
  });
  const crewUser = shareCrew(context, userId, crew.id, "Onwer", "Owner");
  return crew;
}

async function shareCrew(context, userId, crewId, userPermission, permission) {
  if (resolvePermission(userPermission, permission)) {
    const crewUser = await context.prisma.crewUser.create({
      data: {
        userId,
        crewId,
        permission
      }
    });
    return crewUser;
  }
}

export { newCrew, shareCrew };
