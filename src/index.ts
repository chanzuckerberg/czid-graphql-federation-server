import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./czid-graphql-typedef.js";
import { fetchSample } from "./czid-graphql-queries/get_sample.js";
import { fetchProject } from "./czid-graphql-queries/get_project.js";
import { fetchTaxonDist } from "./czid-rest-requests/get_taxon_dist.js";
import { fetchTaxonDescription } from "./czid-rest-requests/get_taxon_descriptions.js";


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves projects from the "projects" array above.
export const resolvers = {
  Query: {
    project: async (parent, args, contextValue, info) =>
      await fetchProject(parent, args, contextValue, info),
    sample: async (parent, args, contextValue, info) =>
      await fetchSample(parent, args, contextValue, info),
    taxonDist: async (parent, args, contextValue, info) =>
      await fetchTaxonDist(parent, args, contextValue, info),
    taxonDescription: async (parent, args, contextValue, info) =>
      await fetchTaxonDescription(parent, args, contextValue, info),
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
