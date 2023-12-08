import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//const { UserInputError } = require("apollo-server");
import { APP_SECRET, getUserId } from "../../../src/utils.js";

async function signup(parent, args, context, info) {
  // 1
  const password = await bcrypt.hash(args.password, 10);

  // 2
  const user = await context.prisma.User.create({
    data: {
      ...args,
      password: password
    }
  });
  if (user) {
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    console.log(token);
    return {
      token,
      user
    };
  } else {
    return null;
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.User.findUnique({
    where: { email: args.email }
  });
  if (!user) {
    throw new Error("No such user found");
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 3
  return {
    token,
    user
  };
}

export default {
  signup,
  login
};
