import { PrismaClient } from "@prisma/client";
import { getUserId } from "./helperFunctions/utils.js";

const prisma = new PrismaClient();

function context({ req }) {
  return {
    ...req,
    prisma,
    userId: req && req.headers.authorization ? getUserId(req) : null
  };
}

export { context };
