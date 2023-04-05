import { ApolloServer } from "@apollo/server";

import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from "./czid-graphql-typedef.js";
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { resolvers } from "./resolvers.js";
import pkg from 'body-parser';
import express from 'express';
import cors from 'cors';

const { json } = pkg;

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
app.use('/graphqlfed', cors<cors.CorsRequest>(), json(), expressMiddleware(server, {
  context: async ({ req }) => {
    return {
      headers: req.headers,
    };
  },
}));
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
