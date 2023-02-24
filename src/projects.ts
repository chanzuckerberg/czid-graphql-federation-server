import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { request, gql } from "graphql-request";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Project" type defines the queryable fields for every book in our data source.
  type Project {
    id: Int
    name: String
    createdAt: String
    updated_at: String
    public_access: Int
    days_to_keep_sample_private: Int
    background_flag: Int
    description: String
    subsample_default: Int
    max_input_fragments_default: Int
    total_sample_count: Int
    # creator: Types::UserType, null: true
    # samples: [Types::SampleType], null: true
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    project(id: Int!): Project
    projects: [Project]
}
`;

// TODO: Remove hardcoded cookie
export const fetchProject = async (parent, args, contextValue, info) => {
  console.log(args);
  console.log("parent", parent);
  console.log("args", args);
  console.log("contextValue", contextValue);
  const projectId = args.id;
  const requestHeaders = contextValue.headers;
  const query = gql`
    query GetProjects($projectId: Int!) {
      project(id: $projectId) {
        id
        name
        createdAt
        publicAccess
        totalSampleCount
      }
    }
  `;
  const api_url = process.env.API_URL;
  const res = await request(
    api_url,
    query,
    { projectId: parseInt(projectId) },
    // The czid-cookie is thus named because
    // the apollo server client strips out the "cookie" header
    { Cookie: requestHeaders["czid-cookie"] }
  );
  return res.project;
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves projects from the "projects" array above.
export const resolvers = {
  Query: {
    project: async (parent, args, contextValue, info) =>
      await fetchProject(parent, args, contextValue, info),
  },
};
