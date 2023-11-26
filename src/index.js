const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { context } = require("./context");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Recipe = require("./resolvers/Recipe");
const Inventory = require("./resolvers/Inventory");
const RecipeBook = require("./resolvers/RecipeBook");
const Ingredient = require("./resolvers/Ingredient");
const Spec = require("./resolvers/Spec");
const Touch = require("./resolvers/Touch");

const resolvers = {
  Query,
  Mutation,
  Recipe,
  RecipeBook,
  User,
  Ingredient,
  Inventory,
  Touch,
  Spec
};

const server = new ApolloServer({ typeDefs, resolvers, context: context });

server.listen().then(({ url }) =>
  console.log(`
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/js/graphql-sdl-first#using-the-graphql-api`)
);
