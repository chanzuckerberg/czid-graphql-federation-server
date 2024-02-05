import { ExecuteMeshFn } from "@graphql-mesh/runtime";
import { getBulkDownloadCGOverviewExampleQuery, getBulkDownloadCGOverviewResponse } from "./utils/ExampleQueryFiles";
import { getMeshInstance } from "./utils/MeshInstance";

import * as httpUtils from "../utils/httpUtils";
jest.mock("../utils/httpUtils");

beforeEach(() => {
  (httpUtils.getFullResponse as jest.Mock).mockClear();
});

const bulkDownloadCGOverviewResponse = "../../sample-responses/cgOverview.json";

describe.only("BulkDownloadCGOverview Query", () => {
  let execute: ExecuteMeshFn;
  let query: string;

  beforeEach(async () => {
    const mesh$ = await getMeshInstance();
    // Load BulkDownloadCGOverview example query
    ({ execute } = mesh$);
    query = getBulkDownloadCGOverviewExampleQuery();
  });

  describe("BulkDownloadCGOverview successful response", () => {
    const bulkDownloadCGOverviewResponse = JSON.parse(getBulkDownloadCGOverviewResponse());

    it("should give correct response", async () => {
      (httpUtils.postWithCSRF as jest.Mock).mockImplementation(() => bulkDownloadCGOverviewResponse);
      const result = await execute(query, {
        authenticityToken: "4jBT7An+vvgmzV8GjHerNYSl+u/fpfegHMtV7casm9ia89Pouk/ycbusEZXtslQIwN4Svx/wxaddloQ2Pz1ugA==",
        downloadType: "consensus_genome_overview", 
        includeMetadata: false,
        workflow: "consensus_genome", 
        workflowRunIds: [1991, 2007]
      });
      console.log(result);
      expect(result.data.BulkDownloadCGOverview.cgOverviewRows).toStrictEqual(bulkDownloadCGOverviewResponse.cg_overview_rows);
    });
  });

  // describe("ZipLink with error", () => {
  //   const errorZipLinkWorkflowRunId = "mockErrorZipLinkId";
  //   const zipLinkError = "zip_link_error"

  //   it("should give correct response", async () => {
  //     (httpUtils.getFullResponse as jest.Mock).mockImplementation(() => (
  //       {
  //         status: 500,
  //         url: null,
  //         statusText: zipLinkError
  //       }
  //     ));

  //     const result = await execute(query, { workflowRunId: errorZipLinkWorkflowRunId });
  //     expect(result.data.ZipLink.error).toBe(zipLinkError);
  //   });
  // });
});
