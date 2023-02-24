import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./projects.js";

const server = new ApolloServer({ typeDefs, resolvers });
const port = 4444;
const { url } = await startStandaloneServer(server, {
  listen: { port },
  context: async ({ req }) => {
    return {
      headers: req.headers,
    };
  },
});
console.log(`🚀 Server ready at ${url}`);
