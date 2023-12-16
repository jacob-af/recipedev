async function createIngredient(
  context,
  name,
  description,
  amount,
  unit,
  price,
  source,
  ingredientTypeId
) {
  try {
    console.log("hello");
    const ingredient = await context.prisma.ingredient.create({
      data: {
        name,
        description,
        amount,
        unit,
        price,
        source,
        ingredientTypeId,
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
        message: err.message
      }
    };
  }
}

async function updateIngredient(
  context,
  id,
  name,
  description,
  amount,
  unit,
  price,
  source,
  ingredientTypeId
) {
  try {
    const ingredient = await context.prisma.ingredient.update({
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
        ingredientTypeId
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

async function deleteIngredient(context, ingredientId) {
  try {
    const ingredient = await context.prisma.ingredient.delete({
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

async function deleteIngredientPermission(context, userId, ingredientId) {
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
  createIngredient,
  updateIngredient,
  deleteIngredient,
  createIngredientPermission,
  deleteIngredientPermission
};
