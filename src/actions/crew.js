async function createCrew(context, name, description, userId) {
  try {
    const crew = await context.prisma.crew.create({
      data: {
        name,
        description,
        createdById: userId,
        editedById: userId
      }
    });
    const crewUser = await createPermissionOnCrew(
      context,
      userId,
      crew.id,
      "Owner",
      "Owner"
    );

    return {
      crew,
      permission: crewUser.permission,
      status: {
        message: "It works!",
        code: "Success"
      }
    };
  } catch (err) {
    console.log(err);
    return {
      status: {
        code: err.code,
        message: err.message
      }
    };
  }
}

async function updateCrew(context, crewId, name, description) {
  try {
    const crew = await context.prisma.crew.update({
      where: {
        id: crewId
      },
      data: {
        name,
        description,
        editedById: context.userId
      }
    });

    return {
      crew,
      status: {
        message: "It works!",
        code: "Success"
      }
    };
  } catch (err) {
    console.log(err);
    return {
      status: {
        code: err.code,
        message: err.message
      }
    };
  }
}

async function deleteCrew(context, crewId) {
  try {
    const crew = await context.prisma.crew.delete({
      where: { id: crewId }
    });
    console.log(crew);
    return {
      crew,
      status: { message: "It works!", code: "Success" }
    };
  } catch (err) {
    console.log(err);
    return {
      status: {
        code: err.code,
        message: err.message
      }
    };
  }
}

async function createPermissionOnCrew(context, userId, crewId, permission) {
  try {
    const crewUser = await context.prisma.crewUser.upsert({
      where: {
        userId_crewId: {
          userId,
          crewId
        }
      },
      update: {
        permission
      },
      create: {
        userId,
        crewId,
        permission
      }
    });
    return {
      crewUser,
      status: {
        message: "Permission on Recipe Book has changed",
        code: "Success"
      }
    };
  } catch (err) {
    console.log(err);
    return {
      status: {
        code: err.code,
        message: err.message
      }
    };
  }
}

async function deleteCrewPermission(context, userId, crewId) {
  try {
    const crewUser = await context.prisma.crewUser.delete({
      where: {
        userId_crewId: {
          userId,
          crewId
        }
      }
    });
    return {
      crewUser,
      status: {
        message: "You have removed this build from the recipe book!",
        code: "Success"
      }
    };
  } catch (err) {
    console.log(err);
    return {
      status: {
        code: err.code,
        message: err.message
      }
    };
  }
}

export {
  createCrew,
  updateCrew,
  deleteCrew,
  createPermissionOnCrew,
  deleteCrewPermission
};
