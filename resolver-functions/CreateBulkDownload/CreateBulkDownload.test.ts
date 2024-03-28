import { ExecuteMeshFn } from "@graphql-mesh/runtime";
import {
  getExampleQuery,
  getSampleResponse,
} from "../../tests/utils/ExampleQueryFiles";
import { getMeshInstance } from "../../tests/utils/MeshInstance";

import * as httpUtils from "../../utils/httpUtils";
jest.mock("../../utils/httpUtils");

jest.spyOn(httpUtils, "get");
jest.spyOn(httpUtils, "shouldReadFromNextGen");
jest.spyOn(httpUtils, "postWithCSRF");

beforeEach(() => {
  (httpUtils.postWithCSRF as jest.Mock).mockClear();
  (httpUtils.get as jest.Mock).mockClear();
  (httpUtils.shouldReadFromNextGen as jest.Mock).mockClear();
});

describe.only("CreateBulkDownload Query", () => {
  let execute: ExecuteMeshFn;
  let query: string;

  beforeEach(async () => {
    const mesh$ = await getMeshInstance();
    // Load CreateBulkDownload example query
    ({ execute } = mesh$);
    query = getExampleQuery("create-bulk-download-query");
  });

  beforeEach(() => {
    (httpUtils.postWithCSRF as jest.Mock).mockClear();
    (httpUtils.get as jest.Mock).mockClear();
    (httpUtils.shouldReadFromNextGen as jest.Mock).mockClear();
  });

  describe("CreateBulkDownload - with nextGen OFF", () => {
    const createBulkDownloadResponse = getSampleResponse("fedBulkDownload");
    (httpUtils.shouldReadFromNextGen as jest.Mock).mockReturnValueOnce(false);

    it("should give correct response", async () => {
      (httpUtils.postWithCSRF as jest.Mock).mockReturnValueOnce(
        createBulkDownloadResponse,
      );
      const result = await execute(query, {
        authenticityToken: "authtoken1234",
        downloadType: "consensus_genome_intermediate_output_files",
        downloadFormat: "Separate Files",
        workflow: "consensus_genome",
        workflowRunIds: [1991, 2007],
        workflowRunIdsStrings: ["1991", "2007"],
      });
      expect(result.data.CreateBulkDownload).toStrictEqual(
        createBulkDownloadResponse,
      );
    });
  });

  describe("CreateBulkDownload successful response - with nextGen ON", () => {
    const createBulkDownloadResponse = getSampleResponse("fedBulkDownload");
    (httpUtils.shouldReadFromNextGen as jest.Mock).mockReturnValueOnce(true);
    const bulkDownloadDefaultVersion = {
      data: {
        workflows: [
          {
            defaultVersion: "0.0.3",
          },
        ],
      },
    };
    const bulkDownloadVersionId = {
      data: {
        workflowVersions: [
          {
            id: "1234",
          },
        ],
      },
    };
    const getFilesFromEntities = {
      data: {
        consensusGenomes: [
          {
            intermediateOutputs: {
              id: "1234",
            },
          },
        ],
      },
    };

    const runWorkflowVersionMutation = { id: "1234" };
    (httpUtils.get as jest.Mock).mockReturnValueOnce(
      bulkDownloadDefaultVersion,
    );
    (httpUtils.get as jest.Mock).mockReturnValueOnce(bulkDownloadVersionId);
    (httpUtils.get as jest.Mock).mockReturnValueOnce(getFilesFromEntities);
    (httpUtils.fetchFromNextGen as jest.Mock).mockReturnValueOnce(
      runWorkflowVersionMutation,
    );

    it("should give correct response", async () => {
      const result = await execute(query, {
        authenticityToken: "authtoken1234",
        downloadType: "consensus_genome_intermediate_output_files",
        downloadFormat: "Separate Files",
        workflow: "consensus_genome",
        workflowRunIds: [1991, 2007],
        workflowRunIdsStrings: ["1991", "2007"],
      });
      expect(result.data.CreateBulkDownload).toStrictEqual({ id: "1234" });
    });
  });
});
