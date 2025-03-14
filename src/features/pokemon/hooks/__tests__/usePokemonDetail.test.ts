import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { renderHook, waitFor } from '@/tests/tools';
import { usePokemonDetail } from '../usePokemonDetail';
import { getPokemonDetails } from '../../services/api';
import { useParams } from 'react-router-dom';

vi.mock('../../services/api', async (importOriginal) => ({
  ...((await importOriginal()) as object),
  getPokemonDetails: vi.fn(),
}));

vi.mock('react-router-dom', async (importOriginal) => ({
  ...((await importOriginal()) as object),
  useParams: vi.fn(),
}));

describe('usePokemonDetail', () => {
  let mockGetPokemonDetails: Mock;
  let mockUseParams: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetPokemonDetails = getPokemonDetails as unknown as Mock;
    mockUseParams = useParams as unknown as Mock;
  });

  it('fetches Pokémon details correctly', async () => {
    mockUseParams.mockReturnValue({ id: '25' });

    mockGetPokemonDetails.mockResolvedValue({
      id: 25,
      name: 'pikachu',
      image: 'https://example.com/pikachu.png',
      abilities: [],
    });

    const { result } = renderHook(() => usePokemonDetail());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.pokemon).toEqual({
      id: 25,
      name: 'pikachu',
      image: 'https://example.com/pikachu.png',
      abilities: [],
    });

    expect(result.current.pokemonId).toBe(25);
    expect(result.current.isError).toBe(false);
  });

  it('returns isLoading while fetching data', () => {
    mockUseParams.mockReturnValue({ id: '10' });

    mockGetPokemonDetails.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => usePokemonDetail());

    expect(result.current.isLoading).toBe(true);
  });

  it('returns isError when request fails', async () => {
    mockUseParams.mockReturnValue({ id: '50' });

    mockGetPokemonDetails.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => usePokemonDetail());

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.pokemon).toBeUndefined();
  });

  it('returns pokemonId = 1 when the url id is not provided', () => {
    mockUseParams.mockReturnValue({ id: undefined });

    mockGetPokemonDetails.mockResolvedValue({
      id: 1,
      name: 'bulbasaur',
      image: 'https://example.com/bulbasaur.png',
      abilities: [],
    });

    const { result } = renderHook(() => usePokemonDetail());

    expect(result.current.pokemonId).toBe(1);
  });

  it('ensures pokemonId is always a number', () => {
    mockUseParams.mockReturnValue({ id: '16' });

    const { result } = renderHook(() => usePokemonDetail());

    expect(result.current.pokemonId).toBeTypeOf('number');
    expect(result.current.pokemonId).toBe(16);
  });
});
