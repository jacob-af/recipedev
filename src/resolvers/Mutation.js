const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
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

async function addIngredient(parent, args, context, info) {
  const { userId } = context;

  return await context.prisma.ingredient.create({
    data: {
      name: args.name,
      amount: args.amount,
      unit: args.unit,
      price: args.price,
      source: args.source,
      postedBy: { connect: { id: userId } }
    }
  });
}

async function addRecipe(parent, args, context, info) {
  const { userId } = context;
  const recipe = await context.prisma.recipe.create({
    data: {
      name: args.name,
      origin: args.origin,
      history: args.history,
      postedBy: { connect: { id: userId } },
      version: {
        create: {
          versionName: args.versionName,
          instructions: args.instructions,
          glassware: args.glassware,
          ice: args.ice,
          postedBy: { connect: { id: userId } },
          specs: {
            create: args.specArray
          }
        }
      }
    }
  });
  console.log(recipe);
  return recipe;
}

async function addVersion(parent, args, context, info) {
  const { userId } = context;
  const specArrayWithId = args.specArray.map((spec, index) => {
    return {
      order: index,
      postedBy: { connect: { id: userId } },
      ingredient: { connect: { id: spec.ingredientId } },
      amount: spec.amount,
      unit: spec.unit
    };
  });
  const version = await context.prisma.version.create({
    data: {
      recipe: { connect: { id: args.recipeId } },
      versionName: args.versionName,
      instructions: args.instructions,
      glassware: args.glassware,
      ice: args.ice,
      postedBy: { connect: { id: userId } },
      specs: {
        create: specArrayWithId
      }
    }
  });
  return version;
}

async function updateVersion(parent, args, context, info) {
  const version = await context.prisma.version.update({
    where: {
      id: args.versionId
    },
    data: {
      recipe: { connect: { id: args.recipeId } },
      versionName: args.versionName,
      instructions: args.instructions,
      glassware: args.glassware,
      ice: args.ice
    }
  });
  return version;
}

async function updateSingleSpec(parent, args, context, info) {
  console.log(context.prisma.spec_id_seq);
  return await context.prisma.spec.upsert({
    where: { id: args.input.id },
    update: {
      order: args.input.order,
      ingredientId: args.input.ingredientId,
      amount: args.input.amount,
      unit: args.input.unit
    },
    create: {
      versionId: args.versionId,
      order: args.input.order,
      ingredientId: args.input.ingredientId,
      amount: args.input.amount,
      unit: args.input.unit
    }
  });
}

async function updateSpecs(parent, args, context, info) {
  await context.prisma.spec.deleteMany({
    where: { versionId: args.versionId }
  });
  console.log(args.input);
  return await context.prisma.$transaction(
    args.input.map((spec, index) =>
      context.prisma.spec.create({
        data: {
          versionId: args.versionId,
          order: index,
          ingredientId: spec.ingredientId,
          amount: spec.amount,
          unit: spec.unit
        }
      })
    )
  );
}

async function shareVersion(parent, args, context, info) {
  const { userId } = context;
  const admins = await context.prisma.versionAdmin.findMany({
    where: { versionId: args.versionId }
  });
  const admin = admins.find(admin => admin.userId === userId);
  const users = await context.prisma.userVersion.findMany({
    where: { versionId: args.versionId }
  });
  const user = users.find(user => user.userId === userId);

  console.log(admin);
  if (admin) {
    const data = await context.prisma.UserVersion.create({
      data: { versionId: args.versionId, userId: args.toUser }
    });
    console.log(data);
    return data;
  } else {
    console.log("should really throw an error here");
    throw new UserInputError("Invalid argument value");
  }
}

async function adminOnVersion(parent, args, context, info) {
  const { userId } = context;
  const exists = await context.prisma.adminOnVersion.findMany({
    where: { versionId: args.versionId }
  });
  console.log(exists, userId);
  const version = await context.prisma.version.findUnique({
    where: { id: args.versionId }
  });
  if (version.postedById === userId) {
    console.log("if working");
    await context.prisma.adminOnVersion.create({
      data: {
        versionId: args.versionId,
        userId: args.toUser,
        assignedById: userId
      }
    });
    return version;
  } else {
    console.log("if not working");
    return { error: "not your recipe, fool" };
  }
}

module.exports = {
  signup,
  login,
  addIngredient,
  addRecipe,
  addVersion,
  updateVersion,
  shareVersion,
  updateSingleSpec,
  updateSpecs,
  adminOnVersion
};
