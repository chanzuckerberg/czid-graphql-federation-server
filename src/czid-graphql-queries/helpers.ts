import { request, gql } from "graphql-request";

export const makeCZIDGraphQLRequest = async (query, variables, headers) => {
  const api_url = process.env.API_URL;
  const res = await request(
    api_url,
    query,
    variables,
    // The czid-cookie is thus named because
    // the apollo server client strips out the "cookie" header
    { Cookie: headers["czid-cookie"] }
  );
  return res;
};
