import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./typeDefs/index.js";
import { context } from "./context.js";
import Query from "./resolvers/Query.js";
import Mutation from "./mutations/index.js";
import User from "./resolvers/User.js";
import Recipe from "./resolvers/Recipe.js";
import Inventory from "./resolvers/Inventory.js";
import IngredientUser from "./resolvers/IngredientUser.js";
import RecipeBook from "./resolvers/RecipeBook.js";
import RecipeBookUser from "./resolvers/RecipeBookUser.js";
import GenericIngredient from "./resolvers/GenericIngredient.js";
import Build from "./resolvers/Build.js";
import Touch from "./resolvers/Touch.js";
import CrewUser from "./resolvers/CrewUser.js";

const resolvers = {
  Query,
  Mutation,
  Recipe,
  RecipeBook,
  RecipeBookUser,
  User,
  GenericIngredient,
  Inventory,
  IngredientUser,
  Touch,
  Build,
  CrewUser
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  context,
  listen: { port: 4000 }
});
console.log(`🚀 Server listening at: ${url}`);
