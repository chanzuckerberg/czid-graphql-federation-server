import { ExecuteMeshFn } from "@graphql-mesh/runtime";
import { errorZipLinkWorkflowRunId, zipLinkError, zipLinkUrl, zipLinkWorkflowRunId } from "./mocks/MockZipLink";
import { getZipLinkExampleQuery } from "./utils/ExampleQueryFiles";
import { getMeshInstance } from "./utils/MeshInstance";

import * as httpUtils from "../utils/httpUtils";
jest.mock("../utils/httpUtils");

beforeEach(() => {
  (httpUtils.getFullResponse as jest.Mock).mockClear();
});

describe("ZipLink Query", () => {
  let execute: ExecuteMeshFn;
  let query: string;

  beforeEach(async () => {
    const mesh$ = await getMeshInstance();
    // Load ZipLink example query
    ({ execute } = await mesh$);
    query = getZipLinkExampleQuery();
  });

  // no mock plugin
  describe.only("ZipLink with url", () => {
    it("should give correct response", async () => {
      (httpUtils.getFullResponse as jest.Mock).mockImplementation(() => (
        {
          status: 200,
          url: zipLinkUrl,
        }
      ));
      const result = await execute(query, { workflowRunId: zipLinkWorkflowRunId });
      expect(result.data.ZipLink.url).toBe(zipLinkUrl);
    });
  });

  describe("ZipLink with error", () => {
    it("should give correct response", async () => {
      (httpUtils.getFullResponse as jest.Mock).mockImplementation(() => (
        {
          status: 500,
          url: null,
          error: zipLinkError
        }
      ));

      const result = await execute(query, { workflowRunId: errorZipLinkWorkflowRunId });
      expect(result.data.ZipLink.error).toBe(zipLinkError);
    });
  });
});
