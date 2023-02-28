import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "graphql-request";
import { typeDefs } from "./czid-graphql-typedef";
import { fetchSample } from "./czid-graphql-queries/get_sample";
import { fetchProject } from "./czid-graphql-queries/get_project";


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves projects from the "projects" array above.
export const resolvers = {
  Query: {
    project: async (parent, args, contextValue, info) =>
      await fetchProject(parent, args, contextValue, info),
    sample: async (parent, args, contextValue, info) =>
      await fetchSample(parent, args, contextValue, info),
  },
};

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
