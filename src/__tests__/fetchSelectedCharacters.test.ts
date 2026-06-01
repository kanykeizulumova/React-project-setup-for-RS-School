import { vi, test, expect, afterEach } from 'vitest';
import fetchSelectedCharacters from '../fetchSelectedCharacters';
import FetchError from '../FetchError';

afterEach(() => {
  vi.restoreAllMocks();
});

test('should return an empty array if ids are empty', async () => {
  const result = await fetchSelectedCharacters({ queryKey: ['key', []] });

  expect(result).toEqual([]);
});

test('fetches characters successfully when ids are provided', async () => {
  const mockCharacters = [
    { id: 1, name: 'Rick Sanchez' },
    { id: 2, name: 'Morty Smith' },
  ];

  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => mockCharacters,
  });

  const result = await fetchSelectedCharacters({
    queryKey: ['key', ['1', '2']],
  });

  expect(globalThis.fetch).toHaveBeenCalledWith(
    'https://rickandmortyapi.com/api/character/1,2'
  );
  expect(result).toEqual(mockCharacters);
});

test('wraps a single character object into an array', async () => {
  const mockCharacter = { id: 1, name: 'Rick Sanchez' };

  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => mockCharacter,
  });

  const result = await fetchSelectedCharacters({ queryKey: ['key', ['1']] });

  expect(result).toEqual([mockCharacter]);
});

test('throws FetchError when the network response is not ok', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 500,
  });

  await expect(
    fetchSelectedCharacters({ queryKey: ['key', ['2']] })
  ).rejects.toThrow(FetchError);
});
