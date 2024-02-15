import { ExecuteMeshFn } from "@graphql-mesh/runtime";
import { exampleQueriesDir, readFileFrom } from "./utils/ExampleQueryFiles";
import { getMeshInstance } from "./utils/MeshInstance";

import * as httpUtils from "../utils/httpUtils";
jest.mock("../utils/httpUtils");

beforeEach(async () => {
  (httpUtils.getFullResponse as jest.Mock).mockClear();
});

describe("bulkDownloads Query:", () => {
  let execute: ExecuteMeshFn;

  beforeEach(async () => {
    const mesh$ = await getMeshInstance();
    ({ execute } = mesh$);
  });
  
  it("should give correct response without url params", async () => {
    const query = readFileFrom(`${exampleQueriesDir}/bulk-downloads.graphql`);
    const bulkDownloadResponse = JSON.parse(readFileFrom("../../sample-responses/bulkDownload.json"));
    (httpUtils.get as jest.Mock).mockImplementation(() => bulkDownloadResponse);
    const result = await execute(query, { limit: 2, searchBy: "Suzette McCanny" });
    expect(result.data.bulkDownloads).toStrictEqual(bulkDownloadResponse);
  });

  it("should give correct response with url params", async () => {
    const query = readFileFrom(`${exampleQueriesDir}/bulk-downloads-with-limit.graphql`);
    const bulkDownloadResponse = JSON.parse(readFileFrom("../../sample-responses/bulkDownload.json"));
    (httpUtils.get as jest.Mock).mockImplementation(() => bulkDownloadResponse);
    const result = await execute(query, { limit: 2, searchBy: "Suzette McCanny" });
    expect(result.data.bulkDownloads).toStrictEqual(bulkDownloadResponse);
  });
});
