import { ExecuteMeshFn } from "@graphql-mesh/runtime";
import { getZipLinkExampleQuery } from "./utils/ExampleQueryFiles";
import { getMeshInstance } from "./utils/MeshInstance";

import * as httpUtils from "../utils/httpUtils";
jest.mock("../utils/httpUtils");

beforeEach(() => {
  (httpUtils.getFullResponse as jest.Mock).mockClear();
});

const query = `
    query TestQuery($where) {
        consensusGenomes(where: $where) {
          producingRunId
          sequencingRead {
            sample {
              ownerUser
              metadatas
            }
          }
        }
    }
`;
const params = {
  where: {
    taxon: {
      name: {
        _in: "123",
      },
    },
  },
};

describe("consensusGenomes query:", () => {
  let execute: ExecuteMeshFn;

  beforeEach(async () => {
    const mesh$ = await getMeshInstance();
    ({ execute } = mesh$);
  });

  it("Returns empty list", async () => {
    (httpUtils.getFullResponse as jest.Mock).mockImplementation(() => ({
      workflow_runs: [],
    }));

    const response = await execute(query, params);

    expect(response.data.consensusGenomes).toHaveLength(0);
  });

  it("Returns nested fields", async () => {
    (httpUtils.getFullResponse as jest.Mock).mockImplementation(() => ({
      workflow_runs: [
        {
          sample: {
            uploader: {
              name: "Bob",
            },
          },
        },
        {
          sample: {
            uploader: {
              name: "Alice",
            },
          },
        },
      ],
    }));

    const result = await execute(query, params);

    expect(result.data.consensusGenomes).toHaveLength(2);
    expect(
      result.data.consensusGenomes[0].sequencingRead.sample.ownerUser
    ).toBe("Bob");
  });

  it("Returns metadata", async () => {});
});
