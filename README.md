# graphql-federation-server

Run this service locally:
`make local-init`

## Code Generation
This project uses [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator) in order to generate types for graphql related entities (queries, mutations, types, etc) as well as the graphql schema in json format.

In order to generate the code simply run `npm run codegen`