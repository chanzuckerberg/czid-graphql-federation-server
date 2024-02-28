import { formatFedQueryForNextGen } from "../utils/httpUtils";

describe("FormatFedQuery:", () => {
  describe("formatFedQuery:", () => {
    it("Removes fed prefix from the top level query", () => {
      expect(
        formatFedQueryForNextGen("query fedConsensusGenome")
      ).toBe("query consensusGenome");
    });

    // it("It does not remove fed from lower in the query", () => {
    //   expect(
    //     formatFedQueryForNextGen({
    //       param1: 123,
    //       param2: undefined,
    //       param3: null,
    //       param4: 456,
    //     })
    //   ).toBe("?&param1=123&param4=456");
    // });

    // it("It can handle a list of bespoke swaps", () => {
    //   expect(
    //     formatFedQueryForNextGen({
    //       param1: [123, 456],
    //       param2: [],
    //     })
    //   ).toBe("?&param1[]=123&param1[]=456");
    // });

    it("removes the input wrapper from the query variables", () => {
      expect(
        formatFedQueryForNextGen(`consensusGenomes(input: { where: { id: { _eq: $workflowRunId } } }) {`)
      ).toBe(`consensusGenomes( where: { id: { _eq: $workflowRunId } } ) {`);
    });
  });
});
