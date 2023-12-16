import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./typeDefs/index.js";
import { context } from "./context.js";
import Query from "./resolvers/Query.js";
import Mutation from "./mutations/index.js";
import User from "./resolvers/User.js";
import Recipe from "./resolvers/Recipe.js";
import Inventory from "./resolvers/Inventory.js";
import InventoryUser from "./resolvers/InventoryUser.js";
import InventoryStorage from "./resolvers/InventoryStorage.js";
import IngredientStorage from "./resolvers/IngredientStorage.js";
import IngredientUser from "./resolvers/IngredientUser.js";
import RecipeBook from "./resolvers/RecipeBook.js";
import RecipeBookUser from "./resolvers/RecipeBookUser.js";
import IngredientType from "./resolvers/IngredientType.js";
import Build from "./resolvers/Build.js";
import BuildUser from "./resolvers/BuildUser.js";
import Touch from "./resolvers/Touch.js";
import Crew from "./resolvers/Crew.js";
import CrewUser from "./resolvers/CrewUser.js";
import CrewIngredient from "./resolvers/CrewIngredient.js";
import CrewBuild from "./resolvers/CrewBuild.js";
import CrewInventory from "./resolvers/CrewInventory.js";
import CrewStorage from "./resolvers/CrewStorage.js";
import CrewRecipeBook from "./resolvers/CrewRecipeBook.js";
import StorageUser from "./resolvers/StorageUser.js";

const resolvers = {
  Query,
  Mutation,
  Recipe,
  RecipeBook,
  RecipeBookUser,
  User,
  IngredientType,
  Inventory,
  InventoryUser,
  InventoryStorage,
  IngredientUser,
  IngredientStorage,
  Touch,
  Build,
  BuildUser,
  Crew,
  CrewUser,
  CrewIngredient,
  CrewBuild,
  CrewInventory,
  CrewStorage,
  CrewRecipeBook,
  StorageUser
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
