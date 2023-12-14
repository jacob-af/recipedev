import {
  createCrew,
  updateCrew,
  deleteCrew,
  createBuildOnCrew,
  deleteBuildFromCrew,
  createPermissionOnCrew,
  deleteCrewPermission
} from "../actions/crew.js";
import { resolvePermission } from "../actions/utils.js";

async function newCrew(parent, args, context, info) {
  const { userId } = context;
  const { status, permission, crew } = await createCrew(
    context,
    args.name,
    args.description,
    userId
  );

  return {
    status,
    permission,
    crew
  };
}

async function editCrew(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Manager")) {
    return {
      status: {
        code: "Failure",
        message: ""
      }
    };
  }
  const { status, crew } = await updateCrew(
    context,
    args.crewId,
    args.name,
    args.description,
    args.permission
  );

  return { status, permission: args.permission, crew };
}

async function trashCrew(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Owner")) {
    return {
      status: {
        code: "Failure",
        message: ""
      }
    };
  }
  const { crew, status } = await deleteCrew(
    context,
    args.crewId,
    args.permission
  );
  return { crew, status, permission: args.permission };
}

async function addBuildToCrew(parent, args, context, info) {
  if (
    !resolvePermission(args.crewPermission, "Manager") ||
    !resolvedPermission(args.buildPermission, "Manager")
  ) {
    return {
      status: {
        message: "You don't have permission to add to this Crew",
        code: "Failure"
      }
    };
  }
  return await createBuildOnCrew(
    context,
    args.buildId,
    args.crewId,
    args.crewPermission,
    args.buildPermission
  );
}

async function removeBuildFromCrew(parent, args, context, info) {
  if (!resolvePermission(permission, "Manager")) {
    return {
      status: {
        message: "You don't have permission to remove anything from this Crew",
        code: "Failure"
      }
    };
  }
  return await deleteBuildFromCrew(
    context,
    args.buildId,
    args.crewId,
    args.permission
  );
}

async function changeCrewPermission(parent, args, context, info) {
  if (!resolvePermission(args.userPermission, args.permission)) {
    return {
      status: {
        message: "You don't have permission to remove anything from this Crew",
        code: "Failure"
      }
    };
  }
  const crew = await createPermissionOnCrew(
    context,
    args.userId,
    args.crewId,
    args.permission
  );
  console.log(crew);
  return crew;
}

async function removeCrewPermission(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Manager")) {
    return {
      message: "You don't have permission to remove users from this crew!",
      code: "Failure"
    };
  }
  const response = await deleteCrewPermission(
    context,
    args.userId,
    args.crewId
  );
  console.log(response);
  return response;
}

export default {
  newCrew,
  editCrew,
  trashCrew,
  addBuildToCrew,
  removeBuildFromCrew,
  changeCrewPermission,
  removeCrewPermission
};
