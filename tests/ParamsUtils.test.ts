import { formatUrlParams } from "../utils/paramsUtils";

describe("ParamsUtils:", () => {
  describe("formatUrlParams:", () => {
    it("Returns empty string", () => {
      expect(
        formatUrlParams({
          param1: 123,
          param2: "456",
        }),
      ).toBe("?&param1=123&param2=456");
    });

    it("Filters out nullishes", () => {
      expect(
        formatUrlParams({
          param1: 123,
          param2: undefined,
          param3: null,
          param4: 456,
        }),
      ).toBe("?&param1=123&param4=456");
    });

    it("Handles arrays of strings", () => {
      expect(
        formatUrlParams({
          param1: [123, 456],
          param2: [],
        }),
      ).toBe("?&param1[]=123&param1[]=456");
    });

    it("Handles arrays of objects", () => {
      expect(
        formatUrlParams({
          param1: [{ name: "Not a hit" }, { name: "Inconclusive" }],
        }),
      ).toBe(
        '?&param1[]={"name":"Not a hit"}&param1[]={"name":"Inconclusive"}',
      );
    });

    it("Handles Spaces in strings", () => {
      expect(
        formatUrlParams({
          param1: 123,
          param2: "456 789",
        }),
      ).toBe("?&param1=123&param2=456+789");
    });
  });
});
