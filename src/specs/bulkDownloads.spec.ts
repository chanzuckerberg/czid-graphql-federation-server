import { ApolloServer } from "@apollo/server";

import { typeDefs } from "../czid-graphql-typedef";
import { resolvers } from "../resolvers";

import { faker } from "@faker-js/faker";
import nock from "nock";

test("query for bulk download type data", async () => {
  const testBulkDownloadType = {
    download_type: {
      type: faker.lorem.word(),
      display_name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      category: faker.lorem.word(),
      execution_type: faker.lorem.word(),
    },
  };

  const testBulkDownloadId = faker.datatype.number();
  const apiUrl = new URL(
    process.env.API_URL + "bulk_downloads/" + testBulkDownloadId
  );
  // const apiUrl = new URL(process.env.API_URL + "graphql/");
  const scope = nock(apiUrl.origin)
    .get(apiUrl.pathname)
    .reply(200, testBulkDownloadType);

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
  // @ts-ignore
  const bulkDownloadTypeResponse: BulkDownloadType = response.body.singleResult.data.bulkDownloadType;
  expect(bulkDownloadTypeResponse.type).toEqual(testBulkDownloadType.download_type.type);
  expect(bulkDownloadTypeResponse.displayName).toEqual(
    testBulkDownloadType.download_type.display_name
  );
});

test("query for bulk download data", async () => {
  const testBulkDownload = {
    id: faker.datatype.number(),
    params_json: JSON.stringify({ background: 5 }),
    download_type: faker.lorem.word(),
    status: "success",
    error_message: null,
    user_id: faker.datatype.number(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    progress: faker.datatype.float({ min: 0, max: 100 }),
  };

  const testBulkDownloadId = faker.datatype.number();
  const apiUrl = new URL(process.env.API_URL + "bulk_downloads/" + testBulkDownloadId);
  const scope = nock(apiUrl.origin)
    .get(apiUrl.pathname)
    .reply(200, { bulk_download: testBulkDownload });

  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const query = `
    query BulkDownload($bulkDownloadId: Int!) {
      bulkDownload(bulkDownloadId: $bulkDownloadId) {
        id
        status
      }
    }`;

  const response = await testServer.executeOperation({
    query: query,
    variables: { bulkDownloadId: testBulkDownloadId },
  });

  // @ts-ignore
  expect(response.body.singleResult.errors).toBeUndefined();
  // @ts-ignore
  const bulkDownloadResponse: BulkDownload = response.body.singleResult.data.bulkDownload;
  expect(bulkDownloadResponse.id).toEqual(testBulkDownload.id);
  expect(bulkDownloadResponse.status).toEqual(testBulkDownload.status);
  expect(scope.isDone()).toBe(true);
});