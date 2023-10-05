# czid-graphql-federation-server

## Project overview

The CZ ID graphQL federation server runs on [graphQL Mesh](https://the-guild.dev/graphql/mesh).  The server federates responses from REST and graphQL queries to the [CZ ID Rails application](https://github.com/chanzuckerberg/czid-web-private), to a graphQL schema based on our next generatation data model, and will eventually federate responses from graphQL queries to new services into that data model.  This server is an integral piece of our transition to a system architecture and data model.

## Development Environment setup

To run this service locally, run

```make local-init```

Note that [set up CZ ID setup](https://github.com/chanzuckerberg/czid-web-private/wiki/%5BDev%5D-A-starting-point:-initial-setup) needs to be completed first, to have the docker network configuration in place.  In the  local development environment, CZ ID is run with a nginx reverse proxy that forwards graphql requests to the federation server.

The [Yoga GraphiQL interface](http://localhost:3000/graphqlfed) can be used to manually perform queries against graphQL Mesh.  Note that you need to login via CZ ID first for queries to succeed.

## Configuration Philosophy

This project is built on top of the Graphql Mesh framework. This framework was selected due to the fact that it provides a fair bit of functionality from configuration alone. The configurations are defined in the `.meshrc` file and can handle fetching data from an API and simple [transforms](https://the-guild.dev/graphql/mesh/docs/transforms/transforms-introduction).

However, when the configuration based transforms are not sufficient, and custom code is required, it can be inlcuded in the `resolver.ts` file.

As a rule of thumb, the resolver.ts file should be avoided and all endpoints should be federated via the `.meshrc` file, to the extent possible.

## Project tooling and workflows

### release-please

This project uses [the `release-please` action](https://github.com/google-github-actions/release-please-action) to automatically create release PRs for deploying to production.  This action requires commits (including PR titles) to be written using [Conventional Commit messages](https://www.conventionalcommits.org/).  The `release-please` repo has a [brief overview of Conventional Commit](https://github.com/google-github-actions/release-please-action#how-should-i-write-my-commits).  See [the Production Deplyment section](#production-deployment) for more details about the deploy process.

In the [CZI validation action](https://github.com/chanzuckerberg/github-actions/blob/main/.github/actions/conventional-commits/action.yml#L9C32-L9C64), the types `chore|feat|fix|revert|docs|style` are allowed.

### Code Generation

This project uses [graphql-code-generator](https://github.com/dotansimha/graphql-code-generatora) in order to generate types for graphql related entities (queries, mutations, types, etc) as well as the graphql schema in json format.

In order to generate the code simply run `npm run codegen`.

### Adding new REST endpoints

A common task in this repo is to configure graphQL Mesh to federate an existing REST endpoint response from the CZID backend into a graphQL schema.  This is the typical workflow for the task:

1. Create a response schema file for the endpoint and save in the `sample-responses` directory. This file should contain a sample response received from the REST endpoint
2. Run schema generator script to generate the json schema. For example for BulkDownloads, after having saved the response file in `sample-responses`, run
`python generate_mesh_schema.py sample-responses/bulkDownloads.json json-schemas/bulkDownloads.json`
3. Update the `meshrc.yml` file add the new endpoint being federated. Use one of the existing types as a template

#### Obtaining REST API responses

There are a couple of ways you can obtain the sample REST API responses to use for federation.

1. The easiest way is to open the browser developer tools and navigate to CZID [production](https://czid.org) or [staging](https://staging.czid.org) site. REST API responses can viewed and copied from the request shown in the `Network` tab.
2. Another option is to use an API client like Postman. Here you will have to include the `Cookie` that you can obtain from the frontend network tab in your browser and add the parameters you need.

## Deploying to live environments

This project is configured with a sandbox, staging, and production environment.  In each environment, the Yoga GraphiQL interface is accessible at https://[ENV].czid.org/graphqlfed (as with the dev env, you will need to login to CZ ID first).

### Sandbox deployment

There are two ways to [trigger a deploy to the sandbox environment](https://github.com/chanzuckerberg/czid-graphql-federation-server/blob/main/.github/workflows/deploy-sandbox.yml):

1. Merge or push a branch to the `sandbox` branch.
1. Manually [trigger a branch to be deployed in Actions](https://github.com/chanzuckerberg/czid-graphql-federation-server/actions/workflows/deploy-sandbox.yml), by clicking `Run workflow`, and setting the `Use workflow from` option to the branch you wish to deploy to sandbox.

### Staging deployment

When there is a push to the `main` branch, the [`deploy-staging` workflow](https://github.com/chanzuckerberg/czid-graphql-federation-server/actions/workflows/deploy-staging.yml) pushes the `main` branch onto the `staging` branch, and deploys to the staging environment

### Production deployment

When there is a push to the `main` branch (generally via PR merge), a release PR is created by the Release Please action.  The `release-please` bot keeps the release up to date as long as new commits comply with conventional commits (which is a required PR check).  So the release is always up to date with staging.

When the PR is merged, Release Please will publish a Github release, which triggers a prod deployment.  During prod deployment, the image built in staging is promoted to the prod environment, with env vars updated.

## TODO

In the future, we will probably want to run CZ ID E2E tests on every commit, and possibly before release PRs are merged.  Those tests are currently under development, but once we have confidence in our E2E tests, we can move towards a continuous deployment model with the federation server.

## Code of Conduct

This project adheres to the Contributor Covenant [code of conduct](https://github.com/chanzuckerberg/.github/blob/master/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [opensource@chanzuckerberg.com](mailto:opensource@chanzuckerberg.com).

## Reporting Security Issues

If you believe you have found a security issue, please responsibly disclose by contacting us at [security@chanzuckerberg.com](mailto:security@chanzuckerberg.com).
