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
  const buildingPermit = await editBuildPermission(
    context,
    args.buildId,
    args.userId,
    args.permission,
    args.userPermission
  );
  console.log(buildingPermit);
  return {
    code: "Success",
    message: "you gave access to the build, or changed it, whatever"
  };
}

async function removeBuildPermission(parent, args, context, info) {
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
