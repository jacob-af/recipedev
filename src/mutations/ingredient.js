import {
  createIngredient,
  updateIngredient,
  deleteIngredient,
  createIngredientPermission,
  deleteIngredientPermission
} from "../actions/ingredient.js";
import { resolvePermission } from "../actions/utils.js";

async function addIngredient(parent, args, context, info) {
  console.log("ding");
  const { ingredient, permission, status } = await createIngredient(
    context,
    args.name,
    args.description,
    args.amount,
    args.unit,
    args.price,
    args.source,
    args.ingredientTypeId
  );

  return {
    ingredient,
    permission,
    status
  };
}

async function editIngredient(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Manager")) {
    return {
      status: {
        message: "You do not have permission to do that",
        code: "Failure"
      }
    };
  }
  const { ingredient, status } = await updateIngredient(
    context,
    args.id,
    args.name,
    args.description,
    args.amount,
    args.unit,
    args.price,
    args.source,
    args.ingredientTypeId
  );

  return {
    ingredient,
    permission: args.permission,
    status
  };
}

async function trashIngredient(parent, args, context, info) {
  if (resolvePermission(args.permission, "Owner")) {
    const { ingredient, status } = await deleteIngredient(context, args.id);

    return { ingredient, permission: args.permission, status };
  }
  return {
    status: {
      message: "You do not have permission to do that",
      code: "Failure"
    }
  };
}

async function changeIngredientPermission(parent, args, context, info) {
  if (resolvePermission(args.userPermission, args.permission)) {
    const { ingredientUser, status } = await createIngredientPermission(
      context,
      args.userId,
      args.ingredientId,
      args.permission
    );
    console.log(ingredientUser);
    return {
      ingredientUser,
      status
    };
  }
}

async function removeIngredientPermission(parent, args, context, info) {
  if (!resolvePermission(args.userPermission, args.permission)) {
    console.log(
      !resolvePermission(args.UserPermission, "Manager"),
      !resolvePermission(args.userPermission, args.permission)
    );
    return {
      status: {
        message: "You don't have permission unshare this Recipe!",
        code: "Failure"
      }
    };
  }
  const { ingredientUser, status } = await deleteIngredientPermission(
    context,
    args.userId,
    args.ingredientId
  );
  return {
    ingredientUser,
    status
  };
}

export default {
  addIngredient,
  editIngredient,
  trashIngredient,
  changeIngredientPermission,
  removeIngredientPermission
};
