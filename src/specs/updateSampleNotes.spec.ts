import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../czid-graphql-typedef";
import { resolvers } from "../resolvers";
import { faker } from "@faker-js/faker";
import nock from "nock";
import { MutationResponse } from "../generated/graphql";
import FormData from "form-data";

test("mutation to update sample notes", async () => {
  const testSampleNotes = {
    sample_id: faker.datatype.number(),
    notes: faker.lorem.paragraph(),
    authenticity_token: faker.random.alphaNumeric(20),
  };

  const apiUrl = new URL(process.env.API_URL + "samples/" + testSampleNotes.sample_id + "/save_metadata");
  const scope = nock(apiUrl.origin, {
    reqheaders: {
      "content-type": (headerValue) => headerValue.startsWith("multipart/form-data"),
    },
  })
    .post(apiUrl.pathname)
    .reply(200, { status: 'success' });

  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const mutation = `
    mutation UpdateSampleNotes($sampleId: Int!, $value: String!, $authenticityToken: String!) {
      updateSampleNotes(sampleId: $sampleId, value: $value, authenticityToken: $authenticityToken) {
        status
      }
    }`;

  const response = await testServer.executeOperation({
    query: mutation,
    variables: {
      sampleId: testSampleNotes.sample_id,
      value: testSampleNotes.notes,
      authenticityToken: testSampleNotes.authenticity_token,
    },
  });

  // @ts-ignore
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(scope.isDone()).toBe(true);
  // @ts-ignore
  const updateSampleNotesResponse: MutationResponse = response.body.singleResult.data.updateSampleNotes;
  expect(updateSampleNotesResponse.status).toBe('success');
});
