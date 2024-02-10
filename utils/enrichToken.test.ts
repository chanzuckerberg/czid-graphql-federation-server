import { getEnrichedToken } from './enrichToken';

describe('getEnrichedToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const getContext = (cookieStr) => {
    const mockedHeaders: unknown = {
      get: jest.fn().mockReturnValue(cookieStr),
    };

    return {
      request: {
        headers: mockedHeaders as Headers,
      },
    };
  };

  it('should throw an error if czid_services_token is not found in cookie', async () => {
    const context = getContext('abc=123');
    await expect(getEnrichedToken(context)).rejects.toThrow('No czid_services_token found in cookie');
  });

  it('should throw an error if failed to validate token', async () => {
    const context = getContext('czid_services_token=abc123');

    global.fetch = jest.fn().mockRejectedValue(new Error('Failed to validate token'));

    await expect(getEnrichedToken(context)).rejects.toThrow('Failed to validate token');
  });

  it('should return the enriched token', async () => {
    const context = getContext('czid_services_token=abc123');

    const mockEnrichedToken = 'enrichedToken';
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ token: mockEnrichedToken }),
    });

    const result = await getEnrichedToken(context);

    expect(result).toBe(mockEnrichedToken);
  });
});
