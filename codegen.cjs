
/** @type {import('@graphql-codegen/cli').CodegenConfig} */

const config = {
  overwrite: true,
  schema: "http://localhost:4444",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

module.exports = config;
