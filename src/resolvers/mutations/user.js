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
      name: `${user.userName}'s Recipes`
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
          ingredientId: 1,
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

export default {
  signup,
  login
};
