import { ApolloServer } from "@apollo/server";

import { typeDefs } from "../czid-graphql-typedef";
import { resolvers } from "../resolvers";

import { faker } from "@faker-js/faker";
import nock from "nock";
import { TaxonDescription } from "../generated/graphql";

test("query for taxon description data", async () => {
  const testTaxonDescriptions = {
    taxon1: {
      taxid: faker.datatype.number(),
      title: faker.lorem.words(3),
      summary: faker.lorem.paragraph(),
      wiki_url: faker.internet.url(),
    },
    taxon2: {
      taxid: faker.datatype.number(),
      title: faker.lorem.words(3),
      summary: faker.lorem.paragraph(),
      wiki_url: faker.internet.url(),
    },
  };

  const taxonIdList = Object.values(testTaxonDescriptions).map((taxon) => taxon.taxid) //.join(',');
  const apiUrl = new URL(process.env.API_URL + "taxon_descriptions?taxon_list=" + taxonIdList);
  const scope = nock(apiUrl.origin)
    .get(apiUrl.pathname + apiUrl.search)
    .reply(200, testTaxonDescriptions);

  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const query = `
    query TaxonDescription($taxonIdList: [Int!]) {
      taxonDescription(taxonIdList: $taxonIdList) {
        taxId
        title
        summary
        wikiUrl
      }
    }`;

  const response = await testServer.executeOperation({
    query: query,
    variables: { taxonIdList: taxonIdList },
  });

  expect(response.body.kind).toEqual("single");

  expect(scope.isDone()).toBe(true);
  // @ts-ignore
  expect(response.body.singleResult.errors).toBeUndefined();
  // @ts-ignore
  const taxonDescriptionsResponse: TaxonDescription[] = response.body.singleResult.data.taxonDescription;
  taxonDescriptionsResponse.forEach((taxonDescription, index) => {
    const testTaxonDescription = Object.values(testTaxonDescriptions)[index];
    expect(taxonDescription.taxId).toEqual(testTaxonDescription.taxid);
    expect(taxonDescription.title).toEqual(testTaxonDescription.title);
    expect(taxonDescription.summary).toEqual(testTaxonDescription.summary);
    expect(taxonDescription.wikiUrl).toEqual(testTaxonDescription.wiki_url);
  });
  expect(scope.isDone()).toBe(true);
});
