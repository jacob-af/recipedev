const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const { context } = require("./context");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Recipe = require("./resolvers/Recipe");
const Inventory = require("./resolvers/Inventory");
const RecipeBook = require("./resolvers/RecipeBook");
const GenericIngredient = require("./resolvers/GenericIngredient");
const Build = require("./resolvers/Build");
const Touch = require("./resolvers/Touch");

const resolvers = {
  Query,
  Mutation,
  Recipe,
  RecipeBook,
  User,
  GenericIngredient,
  Inventory,
  Touch,
  Build
};

const server = new ApolloServer({ typeDefs, resolvers, context: context });

server.listen().then(({ url }) =>
  console.log(`
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/js/graphql-sdl-first#using-the-graphql-api`)
);
