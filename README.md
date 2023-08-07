# czid-graphql-federation-server

## Project overview

The CZ ID graphQL federation server runs on [graphQL Mesh](https://the-guild.dev/graphql/mesh).  The server federates responses from REST and graphQL queries to the [CZ ID Rails application](https://github.com/chanzuckerberg/czid-web-private), to a graphQL schema based on our next generatation data model, and will eventually federate responses from graphQL queries to new services into that data model.  This server is an integral piece of our transition to a system architecture and data model.

## Development Environment setup

To run this service locally, run

```make local-init```

Note that [set up CZ ID setup](https://github.com/chanzuckerberg/czid-web-private/wiki/%5BDev%5D-A-starting-point:-initial-setup) needs to be completed first, to have the docker network configuration in place.  In the  local development environment, CZ ID is run with a nginx reverse proxy that forwards graphql requests to the federation server.

## Code Generation

This project uses [graphql-code-generator](https://github.com/dotansimha/graphql-code-generatora) in order to generate types for graphql related entities (queries, mutations, types, etc) as well as the graphql schema in json format.

In order to generate the code simply run `npm run codegen`.

## Adding new REST endpoints

A common task in this repo is to configure graphQL Mesh to federate an existing REST endpoint response from the CZID backend into a graphQL schema.  This is the typical workflow for the task:

1. Create a response schema file for the endpoint and save in the `sample-responses` directory. This file should contain a sample response received from the REST endpoint
2. Run schema generator script to generate the json schema. For example for BulkDownloads, after having saved the response file in `sample-responses`, run
`python generate_mesh_schema.py sample-responses/bulkDownloads.json json-schemas/bulkDownloads.json`
3. Update the `meshrc.yml` file add the new endpoint being federated. Use one of the existing types as a template

### Obtaining REST API responses

There are a couple of ways you can obtain the sample REST API responses to use for federation.

1. The easiest way is to open the browser developer tools and navigate to https://czid.org or https://staging.czid.org. REST API responses can viewed and copied from the request shown in the `Network` tab.
2. Another option is to use an API client like Postman. Here you will have to include the `Cookie` that you can obtain from the frontend network tab in your browser and add the parameters you need.
