import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPokemonList, getPokemonDetails, LIMIT } from '../api';
vi.mock('@/lib/fetchClient');

describe('API Service', () => {
  const mockFetchClient = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches the Pokémon list correctly', async () => {
    mockFetchClient.mockResolvedValue({ results: [], count: 100 });

    const response = await getPokemonList(1, mockFetchClient);

    expect(response).toEqual({ results: [], count: 100 });
    expect(mockFetchClient).toHaveBeenCalledWith(`/pokemon?limit=${LIMIT}&offset=0`);
  });

  it('throws an error if page number is less than 1', async () => {
    await expect(getPokemonList(0)).rejects.toThrow();
  });

  it('fetches Pokémon details correctly', async () => {
    mockFetchClient.mockResolvedValue({
      id: 1,
      name: 'bulbasaur',
      abilities: [],
      sprites: { other: { 'official-artwork': { front_default: 'bulbasaur.png' } } },
    });

    const response = await getPokemonDetails('1', mockFetchClient);

    expect(response).toEqual({
      id: 1,
      name: 'bulbasaur',
      abilities: [],
      imageUrl: 'bulbasaur.png',
    });
    expect(mockFetchClient).toHaveBeenCalledWith('/pokemon/1');
  });

  it('throws an error if Pokémon ID is missing', async () => {
    await expect(getPokemonDetails('')).rejects.toThrow();
  });
});
