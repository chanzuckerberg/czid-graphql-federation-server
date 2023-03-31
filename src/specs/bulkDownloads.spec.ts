import { ApolloServer } from "@apollo/server";

import { typeDefs } from "../czid-graphql-typedef";
import { resolvers } from "../resolvers";

import { faker } from "@faker-js/faker";
import nock from "nock";

test("query for bulk download type data", async () => {
  const testBulkDownloadType = {
    type: faker.lorem.word(),
    display_name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    category: faker.lorem.word(),
    execution_type: faker.lorem.word(),
  };

  const testBulkDownloadId = faker.datatype.number();
  const apiUrl = new URL(process.env.API_URL + "bulk_downloads/" + testBulkDownloadId);
  const scope = nock(apiUrl.origin)
    .get(apiUrl.pathname)
    .reply(200, {
      data: { bulkDownloadType: testBulkDownloadType },
    });

  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const query = `
    query BulkDownloadType($bulkDownloadId: Int!) {
      bulkDownloadType(bulkDownloadId: $bulkDownloadId) {
        type
        displayName
      }
    }`;

  const response = await testServer.executeOperation({
    query: query,
    variables: { bulkDownloadId: testBulkDownloadId },
  });

  expect(response.body.kind).toEqual("single");
  expect(scope.isDone()).toBe(true);
  // // @ts-ignore
  // const bulkDownloadTypeResponse: BulkDownloadType = response.body.singleResult.data.bulkDownloadType;
  // expect(bulkDownloadTypeResponse.type).toEqual(testBulkDownloadType.type);
  // expect(bulkDownloadTypeResponse.displayName).toEqual(
  //   testBulkDownloadType.display_name
  // );
});
