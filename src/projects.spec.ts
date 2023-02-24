import { typeDefs, resolvers } from "./projects";
import { ApolloServer } from "@apollo/server";
import { faker } from "@faker-js/faker";

import nock from "nock";

test("query for project data", async () => {
  const testProject = {
    id: faker.datatype.number(),
    name: faker.commerce.productName(),
    createdAt: faker.date.past(),
    updated_at: faker.date.past(),
    public_access: faker.datatype.boolean(),
    days_to_keey_sample_private: faker.datatype.number(),
    background_flag: faker.datatype.number(),
    description: faker.lorem.paragraph(),
    subsample_default: faker.datatype.number(),
    max_input_fragments_default: faker.datatype.number(),
    total_sample_count: faker.datatype.number(),
  };

  const scope = nock(process.env.API_URL)
    .post("/graphql")
    .reply(200, testProject);
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const response = await testServer.executeOperation({
    query: "query MyQuery($id: Int) { project(id: $id) {id name} }",
    variables: { id: testProject.id },
  });

  expect(response.body.kind).toEqual("single");
  console.log(response.body);
  expect(scope.isDone()).toBe(true);
  // expect(response.body.singleResult.errors).toBeUndefined();
});
