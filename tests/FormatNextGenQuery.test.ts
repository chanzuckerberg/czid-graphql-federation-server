import { formatFedQueryForNextGen } from "../utils/httpUtils";

describe("FormatFedQuery:", () => {
  describe("formatFedQuery:", () => {
    it("Removes fed prefix from the top level query", () => {
      expect(
        formatFedQueryForNextGen(
          "query ConsensusGenomeReportQuery($workflowRunId: String) {fedConsensusGenomes(input: { where: { id: { _eq: $workflowRunId }}}) {...}}",
        ),
      ).toBe(
        "query ConsensusGenomeReportQuery($workflowRunId: UUID) {consensusGenomes( where: { id: { _eq: $workflowRunId }}) {...}}",
      );
    });

    it("It does not remove fed from lower in the query", () => {
      expect(
        formatFedQueryForNextGen(
          "query ConsensusGenomeReportQuery($workflowRunId: String) {fedConsensusGenomes(input: { where: { id: { _eq: $workflowRunId }}}) {fedTopLevelName, offed}}",
        ),
      ).toBe(
        "query ConsensusGenomeReportQuery($workflowRunId: UUID) {consensusGenomes( where: { id: { _eq: $workflowRunId }}) {fedTopLevelName, offed}}",
      );
    });

    // it("It can handle a list of bespoke swaps", () => {
    //   expect(
    //     formatFedQueryForNextGen({
    //       param1: [123, 456],
    //       param2: [],
    //     })
    //   ).toBe("?&param1[]=123&param1[]=456");
    // });

    it("removes the input wrapper from the query variables", () => {
      expect(formatFedQueryForNextGen(`consensusGenomes(input: { where: { id: { _eq: $workflowRunId }}}) {`)).toBe(
        `consensusGenomes( where: { id: { _eq: $workflowRunId }}) {`,
      );
    });
  });
});
