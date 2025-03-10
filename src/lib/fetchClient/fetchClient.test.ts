import { describe, it, expect, vi, Mock } from 'vitest';
import { createFetchClient } from '.';

global.fetch = vi.fn();

const mockResponse = (data: unknown, ok = true, status = 200, statusText = 'OK') => ({
  ok,
  status,
  statusText,
  json: vi.fn().mockResolvedValue(data),
});

describe('fetchClient', () => {
  const mockBaseUrl = 'https://api.example.com';
  const fetchClient = createFetchClient(mockBaseUrl);

  beforeEach(() => {
    vi.resetAllMocks();
    import.meta.env.VITE_MARVEL_BASE_URL = mockBaseUrl;
  });

  it('Clean the endpoint and base URL', async () => {
    import.meta.env.VITE_MARVEL_BASE_URL = 'https://api.example.com';
    const mockData = { data: 'response data' };
    (fetch as Mock).mockResolvedValue(mockResponse(mockData));
    await fetchClient('test-endpoint');

    expect(fetch).toHaveBeenCalledWith(`https://api.example.com/test-endpoint`, expect.any(Object));
  });

  it('Makes a GET request and return the response data', async () => {
    const mockData = { data: 'response data' };

    (fetch as Mock).mockResolvedValue(mockResponse(mockData));

    const result = await fetchClient<{ data: string }>('/test-endpoint');

    expect(fetch).toHaveBeenCalledWith(`${mockBaseUrl}/test-endpoint`, expect.any(Object));

    expect(result).toEqual(mockData);
  });

  it('Handles HTTP errors correctly', async () => {
    (fetch as Mock).mockResolvedValue(mockResponse(null, false, 404, 'Not Found'));

    await expect(fetchClient('/invalid-endpoint')).rejects.toThrow(
      'Failed to fetch - 404: Not Found',
    );
  });

  it('Allows passing custom request options', async () => {
    const mockData = { success: true };

    (fetch as Mock).mockResolvedValue(mockResponse(mockData));

    await fetchClient('/test', { method: 'POST', headers: { 'Content-Type': 'application/json' } });

    expect(fetch).toHaveBeenCalledWith(
      `${mockBaseUrl}/test`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  it('Throws an error when fetch fails (network error)', async () => {
    (fetch as Mock).mockRejectedValue(new Error('Network error'));

    await expect(fetchClient('/test')).rejects.toThrow('Network error');
  });
});
