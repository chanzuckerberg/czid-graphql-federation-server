import { ApolloServer } from "@apollo/server";

import { typeDefs } from "../czid-graphql-typedef";
import { resolvers } from "../resolvers";

import { faker } from "@faker-js/faker";
import nock from "nock";

test("query for pipeline data", async () => {
  const testPipelineData = {
    stages: [
      {
        name: faker.lorem.word(),
        steps: [],
        jobStatus: "success",
      },
    ],
    status: "success",
  };

  const testSampleId = faker.datatype.number();
  const testPipelineVersion = faker.datatype.string();
  const apiUrl = new URL(
    `${process.env.API_URL}samples/${testSampleId}/pipeline_viz/${testPipelineVersion}.json`
  );
  const scope = nock(apiUrl.origin)
    .get(apiUrl.pathname)
    .reply(200, testPipelineData);

  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const query = `
    query PipelineData($sampleId: Int!, $pipelineVersion: String!) {
      pipelineData(sampleId: $sampleId, pipelineVersion: $pipelineVersion) {
        stages {
          name
        }
        status
      }
    }`;

  const response = await testServer.executeOperation({
    query: query,
    variables: { sampleId: testSampleId, pipelineVersion: testPipelineVersion },
  });

  expect(response.body.kind).toEqual("single");
  expect(scope.isDone()).toBe(true);
  expect(response.body.singleResult.errors).toBeUndefined();
  // @ts-ignore
  const pipelineDataResponse: PipelineData = response.body.singleResult.data.pipelineData;
  expect(pipelineDataResponse.status).toEqual(testPipelineData.status);
  expect(pipelineDataResponse.stages[0].name).toEqual(testPipelineData.stages[0].name);
});

