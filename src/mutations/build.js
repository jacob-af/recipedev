import { resolvePermission } from "../actions/utils.js";
import {
  createBuild,
  editBuildPermission,
  deleteBuildPermission
} from "../actions/build.js";

async function addBuild(parent, args, context) {
  const { build, permission, status } = await createBuild(
    context,
    args.recipeId,
    args.buildName,
    args.instructions,
    args.glassware,
    args.ice,
    args.touchArray
  );
  return {
    permission,
    build,
    status
  };
}

async function changeBuildPermission(parent, args, context, info) {
  if (!resolvePermission(args.userPermission, args.permission)) {
    return {
      message: "You don't have permission to add to this Recipe Book",
      code: "Failure"
    };
  }
  return await editBuildPermission(
    context,
    args.buildId,
    args.userId,
    args.permission
  );
}

async function removeBuildPermission(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Manager")) {
    return {
      message: "You don't have permission to remove users from this build!",
      code: "Failure"
    };
  }
  return deleteBuildPermission(
    context,
    args.buildId,
    args.userId,
    args.permission,
    args.userPermission
  );
}

export default {
  addBuild,
  changeBuildPermission,
  removeBuildPermission
};
