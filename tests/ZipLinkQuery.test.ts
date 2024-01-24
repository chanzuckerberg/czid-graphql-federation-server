import { findAndParseConfig } from "@graphql-mesh/cli";
import { getMesh } from "@graphql-mesh/runtime";
import { join } from "path";
import { readFileSync } from "fs";
import { errorZipLinkWorkflowRunId, zipLinkError, zipLinkUrl, zipLinkWorkflowRunId } from "./mocks/MockZipLink";

const mesh$ = findAndParseConfig({
  dir: join(__dirname, ".."),
}).then(config => getMesh(config));

describe("ZipLink Query", () => {
  describe("ZipLink with url", () => {
    it("should give correct response", async () => {
      const { execute } = await mesh$;
      const query = readFileSync(join(__dirname, "./example-queries/zip-link-query.graphql"), { encoding: "utf8" });
      const result = await execute(query, { workflowRunId: zipLinkWorkflowRunId });
      expect(result.data.ZipLink.url).toBe(zipLinkUrl);
    });
  });

  describe("ZipLink with error", () => {
    it("should give correct response", async () => {
      const { execute } = await mesh$;
      const query = readFileSync(join(__dirname, "./example-queries/zip-link-query.graphql"), { encoding: "utf8" });
      const result = await execute(query, { workflowRunId: errorZipLinkWorkflowRunId });
      expect(result.data.ZipLink.error).toBe(zipLinkError);
    });
  });
});
