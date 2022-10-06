const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const { APP_SECRET, getUserId } = require("../utils");

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
    const recipeBookArgs = {
      name: "My Recipes"
    };
    const recipeArgs = {
      name: "Create a new Recipe",
      origin: "Where did this recipe originate?",
      history: "What is this recipes history",
      specName: "Name this version",
      instructions: "How is it made?",
      glassware: "What glassware should it be served in?",
      ice: "What ice cream should it be served with?",
      touchArray: [
        {
          order: 0,
          ingredientId: 11,
          amount: 0,
          unit: "oz"
        }
      ]
    };

    context = {
      ...context,
      userId: user.id
    };

    const recipeBook = await createRecipeBook(
      parent,
      recipeBookArgs,
      context,
      info
    );
    const recipeAndSpec = await addRecipe(parent, recipeArgs, context, info);

    const additionArgs = {
      specId: recipeAndSpec.spec.id,
      recipeBookId: recipeBook.id
    };

    await addSpecToRecipeBook(parent, additionArgs, context, info);

    // 4
    return {
      token,
      user
    };
  } else {
    return null;
  }
}

async function login(parent, args, context, info) {
  // 1
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
      postedBy: { connect: { id: userId } }
    }
  });
  const argsWithRecipeId = {
    ...args,
    recipeId: recipe.id
  };
  const spec = await addSpec(parent, argsWithRecipeId, context, info);

  return { recipe, spec };
}

async function addSpec(parent, args, context, info) {
  const { userId } = context;
  const touchArrayWithId = args.touchArray.map((touch, index) => {
    return {
      order: index,
      postedBy: { connect: { id: userId } },
      ingredient: { connect: { id: touch.ingredientId } },
      amount: touch.amount,
      unit: touch.unit
    };
  });
  console.log(args, touchArrayWithId);
  const spec = await context.prisma.spec.create({
    data: {
      recipe: { connect: { id: args.recipeId } },
      specName: args.specName,
      instructions: args.instructions,
      glassware: args.glassware,
      ice: args.ice,
      postedBy: { connect: { id: userId } },
      touch: {
        create: touchArrayWithId
      }
    }
  });
  await context.prisma.adminOnSpec.create({
    data: { specId: spec.id, userId: userId, assignedById: userId }
  });
  return spec;
}

async function createRecipeBook(parent, args, context, info) {
  const { userId } = context;
  const recipeBook = await context.prisma.recipeBook.create({
    data: {
      name: args.name,
      createdBy: { connect: { id: userId } }
    }
  });
  await context.prisma.adminOnRecipeBook.create({
    data: { recipeBookId: recipeBook.id, userId: userId, assignedById: userId }
  });
  return { status: `${args.name} Created`, id: recipeBook.id };
}

async function updateSpec(parent, args, context, info) {
  const spec = await context.prisma.spec.update({
    where: {
      id: args.specId
    },
    data: {
      recipe: { connect: { id: args.recipeId } },
      specName: args.specName,
      instructions: args.instructions,
      glassware: args.glassware,
      ice: args.ice
    }
  });
  return spec;
}

async function updateSingleTouch(parent, args, context, info) {
  console.log(context.prisma.touch_id_seq);
  return await context.prisma.touch.upsert({
    where: { id: args.input.id },
    update: {
      order: args.input.order,
      ingredientId: args.input.ingredientId,
      amount: args.input.amount,
      unit: args.input.unit
    },
    create: {
      specId: args.specId,
      order: args.input.order,
      ingredientId: args.input.ingredientId,
      amount: args.input.amount,
      unit: args.input.unit
    }
  });
}

async function updateTouch(parent, args, context, info) {
  await context.prisma.touch.deleteMany({
    where: { specId: args.specId }
  });
  console.log(args.input);
  return await context.prisma.$transaction(
    args.input.map((touch, index) =>
      context.prisma.touch.create({
        data: {
          specId: args.specId,
          order: index,
          ingredientId: touch.ingredientId,
          amount: touch.amount,
          unit: touch.unit
        }
      })
    )
  );
}

async function shareSpec(parent, args, context, info) {
  const { userId } = context;
  const hasAdmin = await context.prisma.adminOnSpec.findUnique({
    where: { userId_specId: { specId: args.specId, userId: userId } }
  });
  if (hasAdmin) {
    //Check if user has admin rights
    const isShared = await context.prisma.sharedSpec.findUnique({
      where: {
        userId_specId: { specId: args.specId, userId: args.toUser }
      }
    });
    if (isShared) {
      //CHeck if target already has access
      return { status: "This touch has already been shared", id: 0 };
    } else {
      await context.prisma.sharedSpec.create({
        data: {
          specId: args.specId,
          userId: args.toUser,
          sharedById: userId
        }
      });
      return { status: "Spec successfully shared.", id: args.specId };
    }
  } else {
    return { status: "You are not authorized to share this recipe", id: 0 };
  }
}

async function adminOnSpec(parent, args, context, info) {
  const { userId } = context;
  const hasAdmin = await context.prisma.adminOnSpec.findUnique({
    where: { userId_specId: { specId: args.specId, userId: userId } }
  });
  if (hasAdmin) {
    //Check if user has admin rights
    const isAdmin = await context.prisma.adminOnSpec.findUnique({
      where: {
        userId_specId: { specId: args.specId, userId: args.toUser }
      }
    });
    if (isAdmin) {
      //CHeck if target already has access
      return { status: "This user is already an Admin", id: 0 };
    } else {
      await context.prisma.adminOnSpec.create({
        data: {
          specId: args.specId,
          userId: args.toUser,
          assignedById: userId
        }
      });
      return { status: "Spec successfully shared.", id: args.specId };
    }
  } else {
    return { status: "You are not authorized to share this spec", id: 0 };
  }
}

async function shareRecipeBook(parent, args, context, info) {
  const { userId } = context;
  const hasAdmin = await context.prisma.adminOnRecipeBook.findUnique({
    where: {
      userId_recipeBookId: { recipeBookId: args.recipeBookId, userId: userId }
    }
  });
  if (hasAdmin) {
    //Check if user has admin rights
    const isShared = await context.prisma.sharedRecipeBook.findUnique({
      where: {
        userId_recipeBookId: {
          recipeBookId: args.recipeBookId,
          userId: args.toUser
        }
      }
    });
    if (isShared) {
      //CHeck if target already has access
      return { status: "This recipe book has already been shared", id: 0 };
    } else {
      await context.prisma.sharedRecipeBook.create({
        data: {
          recipeBookId: args.recipeBookId,
          userId: args.toUser,
          sharedById: userId
        }
      });
      return {
        status: "Recipe book successfully shared.",
        id: args.recipeBookId
      };
    }
  } else {
    return { status: "You are not authorized to share this recipe", id: 0 };
  }
}

async function adminOnRecipeBook(parent, args, context, info) {
  const { userId } = context;
  const hasAdmin = await context.prisma.adminOnRecipeBook.findUnique({
    where: {
      userId_recipeBookId: { recipeBookId: args.recipeBookId, userId: userId }
    }
  });
  if (hasAdmin) {
    //Check if user has admin rights
    const isAdmin = await context.prisma.adminOnRecipeBook.findUnique({
      where: {
        userId_recipeBookId: {
          recipeBookId: args.recipeBookId,
          userId: args.toUser
        }
      }
    });
    if (isAdmin) {
      //CHeck if target already has access
      return { status: "This user is already an Admin" };
    } else {
      await context.prisma.adminOnRecipeBook.create({
        data: {
          recipeBookId: args.recipeBookId,
          userId: args.toUser,
          assignedById: userId
        }
      });
      return { status: "Admin status granted on Recipe Book" };
    }
  } else {
    return { status: "You are not authorized to share this Recipe Book" };
  }
}

async function addSpecToRecipeBook(parent, args, context, info) {
  const { userId } = context;
  const hasAdmin = await context.prisma.adminOnRecipeBook.findUnique({
    where: {
      userId_recipeBookId: { recipeBookId: args.recipeBookId, userId: userId }
    }
  });
  if (hasAdmin) {
    const alreadyAdded = await context.prisma.RecipeBookSpec.findUnique({
      where: {
        recipeBookId_specId: {
          specId: args.specId,
          recipeBookId: args.recipeBookId
        }
      }
    });
    if (alreadyAdded) {
      return { status: "This spec has already been addedd" };
    } else {
      await context.prisma.RecipeBookSpec.create({
        data: {
          specId: args.specId,
          recipeBookId: args.recipeBookId,
          addedById: userId
        }
      });
      return { status: "Spec successfully added to Recipe Book." };
    }
  } else {
    return { status: "You are not authorized to edit this recipe book" };
  }
}

module.exports = {
  signup,
  login,
  addIngredient,
  addRecipe,
  addSpec,
  updateSpec,
  shareSpec,
  updateSingleTouch,
  updateTouch,
  adminOnSpec,
  createRecipeBook,
  addSpecToRecipeBook,
  adminOnRecipeBook,
  shareRecipeBook
};
