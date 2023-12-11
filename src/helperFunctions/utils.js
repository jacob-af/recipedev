import jwt from "jsonwebtoken";
const APP_SECRET = "GraphQL-is-aw3some";

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error("Not authenticated");
}

// Admin
// Owner
// Manager
// View
// Block

function resolvePermission(userPermission, desiredPermission) {
  function toNumber(permission) {
    switch (permission) {
      case "Admin":
        return 4;
      case "Owner":
        return 3;
      case "Manager":
        return 2;
      case "View":
        return 1;
      default:
        return 0;
    }
  }

  if (toNumber(userPermission) < 2) {
    console.log(userPermission);
    console.log(toNumber(userPermission));
    return false;
  } else if (toNumber(desiredPermission) - toNumber(userPermission) > 0) {
    return false;
  } else {
    return true;
  }
}

export { APP_SECRET, getUserId, resolvePermission };
