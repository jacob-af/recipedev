async function createBuildOnCrew(context, buildId, crewId) {
  try {
    const crewBuild = await context.prisma.crewBuild.create({
      data: {
        buildId,
        crewId
      }
    });
    console.log(crewBuild);
    return {
      crewBuild,
      status: {
        message: "You have added this build to the crew!",
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

async function deleteBuildFromCrew(context, buildId, crewId) {
  try {
    const crewBuild = await context.prisma.crewBuild.delete({
      where: {
        buildId_crewId: {
          buildId,
          crewId
        }
      }
    });
    return {
      crewBuild,
      status: {
        message: "You have removed this build from the Crew!",
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

async function createStorageOnCrew(context, storageId, crewId) {
  try {
    const crewStorage = await context.prisma.crewStorage.create({
      data: {
        storageId,
        crewId
      }
    });
    console.log(crewStorage);
    return {
      crewStorage,
      status: {
        message: "You have added this storage to the crew!",
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

async function deleteStorageFromCrew(context, storageId, crewId) {
  try {
    const crewStorage = await context.prisma.crewStorage.delete({
      where: {
        storageId_crewId: {
          storageId,
          crewId
        }
      }
    });
    return {
      crewStorage,
      status: {
        message: "You have removed this build from the Crew!",
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
async function createInventoryOnCrew(context, inventoryId, crewId) {
  try {
    const crewInventory = await context.prisma.crewInventory.create({
      data: {
        inventoryId,
        crewId
      }
    });
    console.log(crewInventory);
    return {
      crewInventory,
      status: {
        message: "You have added this inventory to the crew!",
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

async function deleteInventoryFromCrew(context, inventoryId, crewId) {
  try {
    const crewInventory = await context.prisma.crewInventory.delete({
      where: {
        inventoryId_crewId: {
          inventoryId,
          crewId
        }
      }
    });
    return {
      crewInventory,
      status: {
        message: "You have removed this build from the Crew!",
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

async function createIngredientOnCrew(context, ingredientId, crewId) {
  try {
    const crewIngredient = await context.prisma.crewIngredient.create({
      data: {
        ingredientId,
        crewId
      }
    });
    console.log(crewIngredient);
    return {
      crewIngredient,
      status: {
        message: "You have added this ingredient to the crew!",
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

async function deleteIngredientFromCrew(context, ingredientId, crewId) {
  try {
    const crewIngredient = await context.prisma.crewIngredient.delete({
      where: {
        ingredientId_crewId: {
          ingredientId,
          crewId
        }
      }
    });
    return {
      crewIngredient,
      status: {
        message: "You have removed this build from the Crew!",
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
async function createRecipeBookOnCrew(context, recipeBookId, crewId) {
  try {
    const crewRecipeBook = await context.prisma.crewRecipeBook.create({
      data: {
        recipeBookId,
        crewId
      }
    });
    console.log(crewRecipeBook);
    return {
      crewRecipeBook,
      status: {
        message: "You have added this recipeBook to the crew!",
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

async function deleteRecipeBookFromCrew(context, recipeBookId, crewId) {
  try {
    const crewRecipeBook = await context.prisma.crewRecipeBook.delete({
      where: {
        recipeBookId_crewId: {
          recipeBookId,
          crewId
        }
      }
    });
    return {
      crewRecipeBook,
      status: {
        message: "You have removed this build from the Crew!",
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
  createInventoryOnCrew,
  deleteInventoryFromCrew,
  createStorageOnCrew,
  deleteStorageFromCrew,
  createIngredientOnCrew,
  deleteIngredientFromCrew,
  createRecipeBookOnCrew,
  deleteRecipeBookFromCrew,
  createBuildOnCrew,
  deleteBuildFromCrew
};
