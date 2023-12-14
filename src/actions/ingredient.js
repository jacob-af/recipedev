async function createSpecificIngredient(
  context,
  name,
  description,
  amount,
  unit,
  price,
  source,
  genericIngredientId
) {
  try {
    const ingredient = await context.prisma.specificIngredient.create({
      data: {
        name,
        description,
        amount,
        unit,
        price,
        source,
        genericIngredientId,
        createdById: context.userId
      }
    });
    const ingredientUser = await createIngredientPermission(
      context,
      context.userId,
      ingredient.id,
      "Owner",
      "Owner"
    );
    return {
      ingredient,
      permission: ingredientUser.ingredientUser.permission,
      status: {
        message: "Ingredient successfully Created",
        code: "Success"
      }
    };
  } catch (err) {
    return {
      status: {
        code: "Failure",
        message: err.meta.cause
      }
    };
  }
}

async function updateSpecificIngredient(
  context,
  id,
  name,
  description,
  amount,
  unit,
  price,
  source,
  genericIngredientId
) {
  try {
    const ingredient = await context.prisma.specificIngredient.update({
      where: {
        id: id
      },
      data: {
        name,
        description,
        amount,
        unit,
        price,
        source,
        genericIngredientId
      }
    });

    return {
      ingredient,
      status: {
        message: "It works!",
        code: "Success"
      }
    };
  } catch {
    return {
      status: {
        code: "Failure",
        message: err.meta.cause
      }
    };
  }
}

async function deleteSpecificIngredient(context, ingredientId) {
  try {
    const ingredient = await context.prisma.specificIngredient.delete({
      where: { id: ingredientId }
    });
    return {
      ingredient,
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
        message: err.meta.cause || null
      }
    };
  }
}

async function createIngredientPermission(
  context,
  userId,
  ingredientId,
  permission
) {
  try {
    const ingredientUser = await context.prisma.ingredientUser.upsert({
      where: {
        ingredientId_userId: { userId, ingredientId }
      },
      update: {
        permission
      },
      create: {
        userId,
        ingredientId,
        permission
      }
    });
    return {
      ingredientUser,
      status: {
        message: "Ingredient has been shared",
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

async function deleteSpecificIngredientPermission(
  context,
  userId,
  ingredientId
) {
  let ingredientUser = {};
  try {
    ingredientUser = await context.prisma.ingredientUser.delete({
      where: {
        ingredientId_userId: { userId, ingredientId }
      }
    });
  } catch (err) {
    console.log(err);
    return {
      status: {
        code: err.code,
        message: err.meta.cause ? err.meta.cause : null
      }
    };
  }
  return {
    ingredientUser,
    status: {
      message: "Ingredient has been shared",
      code: "Success"
    }
  };
}

export {
  createSpecificIngredient,
  updateSpecificIngredient,
  deleteSpecificIngredient,
  createIngredientPermission,
  deleteSpecificIngredientPermission
};
