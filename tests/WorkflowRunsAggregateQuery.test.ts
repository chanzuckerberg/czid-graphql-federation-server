import { ExecuteMeshFn } from "@graphql-mesh/runtime";
import { getMeshInstance } from "./utils/MeshInstance";

import * as httpUtils from "../utils/httpUtils";
jest.spyOn(httpUtils, "get");

beforeEach(() => {
  (httpUtils.get as jest.Mock).mockClear();
});

describe("workflows aggregate query:", () => {
  let execute: ExecuteMeshFn;

  beforeEach(async () => {
    const mesh$ = await getMeshInstance();
    ({ execute } = mesh$);
  });

  it("Returns aggregate counts for each workflow", async () => {
    (httpUtils.get as jest.Mock).mockImplementation(() => ({
      projects: [
        {
          id: 1,
          sample_counts: {
            cg_runs_count: 1,
            amr_runs_count: 2,
            mngs_runs_count: 3
          }
        }
      ],
    }));

    const query = `
      query workflowRunsAggregateQuery(
        $cgWorkflowRunIds: [String]
      ) {
        workflowRunsAggregate(
          input: {
            where: {
              id: {
                _in: $cgWorkflowRunIds
              } 
            },
            todoRemove: { domain: "my_data", offset: 0 }
          }
        ) {
          collectionId
          amrRunsCount
          cgRunsCount
          mngsRunsCount
        }
      }
    `

    const response = await execute(query, {cgWorkflowRunIds: ["1", "2", "3"]});
    expect(httpUtils.get).toHaveBeenCalledWith(
      "/projects.json?&domain=my_data&limit=10000000&listAllIds=false&offset=0",
      expect.anything(),
      expect.anything()
    );

    expect(response.data.workflowRunsAggregate).toHaveLength(1);
    expect(response.data.workflowRunsAggregate[0].collectionId).toBe(1);
    expect(response.data.workflowRunsAggregate[0].amrRunsCount).toBe(2);
    expect(response.data.workflowRunsAggregate[0].cgRunsCount).toBe(1);
    expect(response.data.workflowRunsAggregate[0].mngsRunsCount).toBe(3);
  });
});
