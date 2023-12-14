import { resolvePermission } from "./utils.js";

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
  let ingredient = {};
  let ingredientUser = {};
  try {
    ingredient = await context.prisma.specificIngredient.create({
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
    ingredientUser = await createIngredientPermission(
      context,
      context.userId,
      ingredient.id,
      "Owner",
      "Owner"
    );
  } catch (err) {
    return {
      status: {
        code: "Failure",
        message: err.meta.cause
      }
    };
  }

  return {
    ingredient,
    permission: ingredientUser.ingredientUser.permission,
    status: {
      message: "Ingredient successfully Created",
      code: "Success"
    }
  };
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
  let ingredient = {};
  try {
    ingredient = await context.prisma.specificIngredient.update({
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
  } catch {
    return {
      status: {
        code: "Failure",
        message: err.meta.cause
      }
    };
  }

  return {
    ingredient,
    status: {
      message: "It works!",
      code: "Success"
    }
  };
}

async function deleteSpecificIngredient(context, ingredientId) {
  let ingredient = {};
  try {
    ingredient = await context.prisma.specificIngredient.delete({
      where: { id: ingredientId }
    });
  } catch (err) {
    console.log(err);
    return {
      status: {
        code: err.code,
        message: err.meta.cause || null
      }
    };
  }
  return {
    ingredient,
    status: {
      message: "It works!",
      code: "Success"
    }
  };
}

async function createIngredientPermission(
  context,
  userId,
  ingredientId,
  permission
) {
  let ingredientUser = {};
  try {
    ingredientUser = await context.prisma.ingredientUser.upsert({
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
  } catch (err) {
    console.log(err);
    return {
      status: {
        code: err.code,
        message: err.message
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
