import { gql } from "graphql-request";
import { makeCZIDGraphQLRequest } from "../helpers";

export const fetchProject = async (parent, args, contextValue, info) => {
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
  const res = await makeCZIDGraphQLRequest(query, { projectId: parseInt(projectId) }, requestHeaders);
  return res.project;
};
