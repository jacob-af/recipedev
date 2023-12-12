import { createTouchArray, archiveTouchArray } from "../actions/touch.js";
import { resolvePermission } from "../actions/utils.js";

async function updateTouch(parent, args, context) {
  if (resolvePermission(args.permission, "Manager")) {
    const newTouchArray = await createTouchArray(
      context,
      args.buildId,
      args.newTouchArray,
      args.version + 1
    );
    console.log(newTouchArray);
    const archivedTouchArray = await archiveTouchArray(
      context,
      args.buildId,
      args.version
    );
    return newTouchArray;
  }
}

export default { updateTouch };
