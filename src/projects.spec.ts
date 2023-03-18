import { ApolloServer } from "@apollo/server";

import { typeDefs } from "./czid-graphql-typedef";
import { resolvers } from "./resolvers";

import { faker } from "@faker-js/faker";
import nock from "nock";

test("query for project data", async () => {
  const testProject = {
    id: faker.datatype.number(),
    name: faker.commerce.productName(),
    createdAt: faker.date.past(),
    public_access: faker.datatype.boolean(),
    total_sample_count: faker.datatype.number(),
  };
  const apiUrl = new URL(process.env.API_URL);
  const scope = nock(apiUrl.origin)
    .post(apiUrl.pathname, /.*/)
    .reply(200, { data: { project: testProject } });
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const query = `
    query Project($projectId: Int!) {
      project(id: $projectId) {
        id
        name
      }
    }`;
  const response = await testServer.executeOperation({
    query: query,
    variables: { projectId: testProject.id },
  });

  expect(response.body.kind).toEqual("single");
  expect(scope.isDone()).toBe(true);
  // @ts-ignore
  const projResponse = response.body.singleResult.data.project;
  // @ts-ignore
  expect(projResponse.name).toEqual(testProject.name);
});
