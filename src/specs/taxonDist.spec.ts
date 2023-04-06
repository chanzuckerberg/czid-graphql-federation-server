import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../czid-graphql-typedef";
import { resolvers } from "../resolvers";
import { faker } from "@faker-js/faker";
import nock from "nock";
import { TaxonDist } from "../generated/graphql";

test("query for taxon dist data", async () => {
  const testTaxonDist = {
    tax_id: faker.datatype.number(),
    background_id: faker.datatype.number(),
    merged_nt_nr: {
      taxLevel: 1,
      mean: faker.datatype.float({ min: 0, max: 100, precision: 0.01 }),
      stdev: faker.datatype.float({ min: 0, max: 10, precision: 0.01 }),
      rpmList: [faker.datatype.float({ min: 0, max: 100, precision: 0.01 })],
    },
    nr: {
      taxLevel: 1,
      mean: faker.datatype.float({ min: 0, max: 100, precision: 0.01 }),
      stdev: faker.datatype.float({ min: 0, max: 10, precision: 0.01 }),
      rpmList: [faker.datatype.float({ min: 0, max: 100, precision: 0.01 })],
    },
    nt: {
      taxLevel: 1,
      mean: faker.datatype.float({ min: 0, max: 100, precision: 0.01 }),
      stdev: faker.datatype.float({ min: 0, max: 10, precision: 0.01 }),
      rpmList: [faker.datatype.float({ min: 0, max: 100, precision: 0.01 })],
    },
  };

  const apiUrl = new URL(process.env.API_URL + "backgrounds/" + testTaxonDist.background_id + "/show_taxon_dist?taxid=" + testTaxonDist.tax_id);
  const scope = nock(apiUrl.origin)
    .get(apiUrl.pathname + apiUrl.search)
    .reply(200, testTaxonDist);

  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const query = `
    query TaxonDescription($backgroundId: Int!, $taxId: Int!) {
      taxonDist(backgroundId: $backgroundId, taxId: $taxId) {
        mergedNtNr {
          taxLevel
          mean
          stdev
          rpmList
        }
        nr {
          taxLevel
          mean
          stdev
          rpmList
        }
        nt {
          taxLevel
          mean
          stdev
          rpmList
        }
      }
    }`;

  const response = await testServer.executeOperation({
    query: query,
    variables: { backgroundId: testTaxonDist.background_id, taxId: testTaxonDist.tax_id },
  });
  // @ts-ignore
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(scope.isDone()).toBe(true);
  // @ts-ignore
  const taxonDistResponse: TaxonDist = response.body.singleResult.data.taxonDist;
  expect(taxonDistResponse.mergedNtNr).toEqual(testTaxonDist.merged_nt_nr);
  expect(taxonDistResponse.nr).toEqual(testTaxonDist.nr);
  expect(taxonDistResponse.nt).toEqual(testTaxonDist.nt);
});
