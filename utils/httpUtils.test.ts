import { getContext } from "../tests/utils/MockContext";
import { getEnrichedToken } from "./enrichToken";
import { fetchFromNextGen } from "./httpUtils";

jest.mock("./enrichToken", () => ({
  getEnrichedToken: jest.fn().mockImplementation(() => { console.log("in mocked function"); return Promise.resolve("mockEnrichedToken"); } ),
}));

describe('fetchFromNextGen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when security token is provided', () => {
    it('calls nextGen with provided security token ', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ mockField: "mockValue" }),
      });
      global.fetch = mockFetch;

      const args = {};
      const context = getContext();
      const securityToken = "your-security-token";

      const url = "https://example.com";
      process.env.NEXTGEN_ENTITIES_URL = url;

      await fetchFromNextGen({
        args,
        context,
        serviceType: "entities",
        securityToken,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        `${process.env.NEXTGEN_ENTITIES_URL}/graphql`,
        expect.objectContaining({
          headers: expect.objectContaining({
          Authorization: `Bearer ${securityToken}`,
          }),
        }),
      );
    });
  });

  describe('when no security token is provided', () => {
    it('calls Rails to get a token', async () => {
      const mockFetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ mockField: "mockValue" }),
      });

      global.fetch = mockFetch

      const args = {};
      const context = getContext();

      const url = "https://example.com";
      process.env.NEXTGEN_ENTITIES_URL = url;

      await fetchFromNextGen({
        args,
        context,
        serviceType: "entities",
      });

      expect(getEnrichedToken).toHaveBeenCalled();
    });
  });
});
