import { ApolloServer } from "@apollo/server";

import { typeDefs } from "../czid-graphql-typedef";
import { resolvers } from "../resolvers";

import { faker } from "@faker-js/faker";
import nock from "nock";

test("query for sample data", async () => {
  const testSample = {
    id: faker.datatype.number(),
    name: faker.commerce.productName(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    privateUntil: faker.date.future(),
    projectId: faker.datatype.number(),
    status: "success",
    sampleNotes: faker.lorem.sentence(),
  };
  const apiUrl = new URL(process.env.API_URL + "/graphql");
  const scope = nock(apiUrl.origin)
    .post(apiUrl.pathname, /.*/)
    .reply(200, { data: { sample: testSample } });
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const query = `
    query Sample($sampleId: Int!) {
      sample(sampleId: $sampleId) {
        id
        name
      }
    }`;
  const response = await testServer.executeOperation({
    query: query,
    variables: { sampleId: testSample.id },
  });

  expect(response.body.kind).toEqual("single");
  expect(scope.isDone()).toBe(true);
  // @ts-ignore
  const sampleResponse: Sample = response.body.singleResult.data.sample;
  expect(sampleResponse.name).toEqual(testSample.name);
});
