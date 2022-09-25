const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { context } = require("./context");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Recipe = require("./resolvers/Recipe");
const Ingredient = require("./resolvers/Ingredient");
const Version = require("./resolvers/Version");
const Spec = require("./resolvers/Spec");

const resolvers = {
  Query,
  Mutation,
  Recipe,
  User,
  Ingredient,
  Version,
  Spec
};

const server = new ApolloServer({ typeDefs, resolvers, context: context });

server.listen().then(({ url }) =>
  console.log(`
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/js/graphql-sdl-first#using-the-graphql-api`)
);
