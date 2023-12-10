import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//const { UserInputError } = require("apollo-server");
import { APP_SECRET, getUserId } from "../helperFunctions/utils.js";
import { createRecipeBook } from "../helperFunctions/recipeBook.js";

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

    const recipeBook = await createRecipeBook(
      context,
      `${user.userName}'s Recipe Book`,
      "Your First Recipe Book",
      user.id
    );

    return {
      token,
      user
    };
  } else {
    throw new Error("This is Broken");
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
