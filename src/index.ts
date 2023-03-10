import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./czid-graphql-typedef.js";
import { fetchSample } from "./czid-graphql-queries/get_sample.js";
import { fetchProject } from "./czid-graphql-queries/get_project.js";
import { fetchTaxonDist } from "./czid-rest-requests/get_taxon_dist.js";
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';


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
  },
};

const server = new ApolloServer({ typeDefs, resolvers,  plugins: [
    // Install a landing page plugin based on NODE_ENV
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({ })
      : ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
    {
      requestDidStart: ( requestContext ) => {
        if ( requestContext.request.http?.headers.has( 'x-apollo-tracing' ) ) {
          return;
        }
        const query = requestContext.request.query?.replace( /\s+/g, ' ' ).trim();
        const variables = JSON.stringify( requestContext.request.variables );
        console.log( new Date().toISOString(), `- [Request Started] { query: ${ query }, variables: ${ variables }, operationName: ${ requestContext.request.operationName } }` );
        return;
      },
    },
  ]
});

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
