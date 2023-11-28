import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./typeDefs/index.js";
import { context } from "./context.js";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import User from "./resolvers/User.js";
import Recipe from "./resolvers/Recipe.js";
import Inventory from "./resolvers/Inventory.js";
import RecipeBook from "./resolvers/RecipeBook.js";
import RecipeBookUser from "./resolvers/RecipeBookUser.js";
import GenericIngredient from "./resolvers/GenericIngredient.js";
import Build from "./resolvers/Build.js";
import Touch from "./resolvers/Touch.js";

const resolvers = {
  Query,
  Mutation,
  Recipe,
  RecipeBook,
  RecipeBookUser,
  User,
  GenericIngredient,
  Inventory,
  Touch,
  Build
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  context,
  listen: { port: 4000 }
});
console.log(`🚀 Server listening at: ${url}`);

// const server = new ApolloServer({ typeDefs, resolvers, context: context });

// server.listen().then(({ url }) =>
//   console.log(`
// 🚀 Server ready at: ${url}
// ⭐️ See sample queries: http://pris.ly/e/js/graphql-sdl-first#using-the-graphql-api`)
// );
