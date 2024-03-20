import { fetchFromNextGen } from "./httpUtils";

describe('fetchFromNextGen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const getContext = () => {
    const mockedHeaders: unknown = {
      get: jest.fn().mockReturnValue("cookieValue"),
    };

    return {
      params: {
        query: "query",
        variables: "variables",
      },
      request: {
        headers: mockedHeaders as Headers,
      },
    };
  };

  describe('when security token is provided', () => {
    it('calls nextGen with provided security token ', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        status: 200,
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

      console.log("before expect");
      // Assert that fetch is called with an object that includes a header with the bearer token
      expect(mockFetch).toHaveBeenCalledWith(
        `${url}/graphql`,
        expect.anything(),
      );
    });
  });
});
        // expect.objectContaining({
        //   headers: expect.objectContaining({
        //     Authorization: `Bearer ${securityToken}`,
        //   }),
        // }),
