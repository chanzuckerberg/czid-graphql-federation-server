import { ExecuteMeshFn } from "@graphql-mesh/runtime";
import { getZipLinkExampleQuery } from "./utils/ExampleQueryFiles";
import { getMeshInstance } from "./utils/MeshInstance";

import * as httpUtils from "../utils/httpUtils";
jest.mock("../utils/httpUtils");

beforeEach(() => {
  (httpUtils.getFullResponse as jest.Mock).mockClear();
});

const query = `
    query TestQuery($unused: String) {
        consensusGenomes(where: {
          taxon: {
            name: {
              _in: "123",
            },
          },
        }) {
          producingRunId
          sequenceRead {
            sample {
              ownerUser {
                name
              }
              metadatas {
                edges {
                  node {
                    fieldName
                    value
                  }
                }
              }
            }
          }
        }
    }
`;

describe.only("consensusGenomes query:", () => {
  let execute: ExecuteMeshFn;

  beforeEach(async () => {
    const mesh$ = await getMeshInstance();
    ({ execute } = mesh$);
  });

  it("Returns empty list", async () => {
    (httpUtils.get as jest.Mock).mockImplementation(() => ({
      workflow_runs: [],
    }));

    const response = await execute(query, {});

    expect(response.data.consensusGenomes).toHaveLength(0);
  });

  it("Returns nested fields", async () => {
    (httpUtils.get as jest.Mock).mockImplementation(() => ({
      workflow_runs: [
        {
          id: 123,
          sample: {
            uploader: {
              name: "Bob",
            },
          },
        },
        {
          id: 456,
          sample: {
            uploader: {
              name: "Alice",
            },
          },
        },
      ],
    }));

    const result = await execute(query, {});

    expect(result.data.consensusGenomes).toHaveLength(2);
    expect(result.data.consensusGenomes[0]).toEqual({
      producingRunId: 123,
      sequenceRead: {
        sample: expect.objectContaining({
          ownerUser: {
            name: "Bob",
          },
        }),
      },
    });
    expect(result.data.consensusGenomes[1]).toEqual({
      producingRunId: 456,
      sequenceRead: {
        sample: expect.objectContaining({
          ownerUser: {
            name: "Alice",
          },
        }),
      },
    });
  });

  it("Returns metadata", async () => {
    (httpUtils.get as jest.Mock).mockImplementation(() => ({
      workflow_runs: [
        {
          sample: {
            metadata: {
              key1: "value1",
              nucleotide_type: "DNA",
              key2: "value2",
              key3: "value3",
            },
          },
        },
      ],
    }));

    const result = await execute(query, {});

    const metadataFields =
      result.data.consensusGenomes[0].sequenceRead.sample.metadatas.edges.map(
        (edge) => edge.node.fieldName
      );
    expect(metadataFields).toHaveLength(3);
    expect(metadataFields[0]).toEqual("key1");
    expect(metadataFields[1]).toEqual("key2");
    expect(metadataFields[2]).toEqual("key3");
  });

  it("Returns empty metadata", async () => {
    (httpUtils.get as jest.Mock).mockImplementation(() => ({
      workflow_runs: [
        {
          sample: {},
        },
      ],
    }));

    const result = await execute(query, {});

    expect(
      result.data.consensusGenomes[0].sequenceRead.sample.metadatas.edges
    ).toHaveLength(0);
  });
});
