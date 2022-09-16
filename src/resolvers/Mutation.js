const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function signup(parent, args, context, info) {
  // 1
  const password = await bcrypt.hash(args.password, 10);

  // 2
  const user = await context.prisma.Users.create({
    data: {
      ...args,
      password: password
    }
  });

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 4
  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
  // 1
  const user = await context.prisma.Users.findUnique({
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

async function addRecipe(parent, args, context, info) {
  const { userId } = context;

  return await context.prisma.recipe.create({
    data: {
      name: args.name,
      origin: args.origin,
      history: args.history,
      postedBy: { connect: { id: userId } }
    }
  });
}

async function addSpec(parent, args, context, info) {
  const { userId } = context;

  return await context.prisma.specs.create({
    data: {
      instructions: args.instructions,
      glassware: args.glassware,
      ice: args.ice,
      postedBy: { connect: { id: userId } }
    }
  });
}

async function addIngredient(parent, args, context, info) {
  const { userId } = context;

  return await context.prisma.ingredient.create({
    data: {
      name: args.name,
      amount: args.amount,
      price: args.price,
      source: args.source,
      postedBy: { connect: { id: userId } }
    }
  });
}

module.exports = {
  signup,
  login,
  addRecipe,
  addIngredient
};
