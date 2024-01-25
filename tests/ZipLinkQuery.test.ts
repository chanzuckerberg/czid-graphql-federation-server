import { ExecuteMeshFn } from "@graphql-mesh/runtime";
import { errorZipLinkWorkflowRunId, zipLinkError, zipLinkUrl, zipLinkWorkflowRunId } from "./mocks/MockZipLink";
import { getZipLinkExampleQuery } from "./utils/ExampleQueryFiles";
import { getMeshInstance } from "./utils/MeshInstance";

describe("ZipLink Query", () => {
  let execute: ExecuteMeshFn;
  let query: string;

  beforeEach(async () => {
    const mesh$ = await getMeshInstance();
    // Load ZipLink example query
    ({ execute } = await mesh$);
    query = getZipLinkExampleQuery();
  });

  describe("ZipLink with url", () => {
    it("should give correct response", async () => {
      const result = await execute(query, { workflowRunId: zipLinkWorkflowRunId });
      expect(result.data.ZipLink.url).toBe(zipLinkUrl);
    });
  });

  describe("ZipLink with error", () => {
    it("should give correct response", async () => {
      const result = await execute(query, { workflowRunId: errorZipLinkWorkflowRunId });
      expect(result.data.ZipLink.error).toBe(zipLinkError);
    });
  });
});
