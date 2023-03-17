import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from "./czid-graphql-typedef.js";
import { fetchSample } from "./czid-graphql-queries/get_sample.js";
import { fetchProject } from "./czid-graphql-queries/get_project.js";
import { fetchTaxonDist } from "./czid-rest-requests/get_taxon_dist.js";
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { fetchTaxonDescription } from "./czid-rest-requests/get_taxon_descriptions.js";
import { fetchBulkDownload } from "./czid-rest-requests/get_bulk_downloads.js";
import { fetchBulkDownloadType } from "./czid-rest-requests/get_bulk_download_type.js";
import { updateSampleNotes } from "./czid-rest-requests/update_sample_notes.js";
import pkg from 'body-parser';
import express from 'express';
import cors from 'cors';

const { json } = pkg;

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
    bulkDownload: async (parent, args, contextValue, info) =>
      await fetchBulkDownload(parent, args, contextValue, info),
    bulkDownloadType: async (parent, args, contextValue, info) =>
      await fetchBulkDownloadType(parent, args, contextValue, info),
  },
  Mutation: {
    updateSampleNotes: async (parent, args, contextValue, info) =>
      await updateSampleNotes(parent, args, contextValue, info),
  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers,  plugins: [
    // Install a landing page plugin based on NODE_ENV. In Development
    // we want to make sure to load up apollo's interactive gql interface
    // and enable the includeCookies flag so we send auth info to rails,
    // and in production we just want to display a basic landing page.
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({ })
      : ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
    {
      requestDidStart: async ( requestContext ) => {
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

await server.start();
app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server, {
  context: async ({ req }) => {
    return {
      headers: req.headers,
    };
  },
}));

// Healthcheck to make our infra happy
app.get('/health', (req, res) => {
  res.status(200).send('healthy');
});

await new Promise<void>((resolve) => app.listen({ port: port }, resolve));

console.log(`🚀 Server ready!`);
