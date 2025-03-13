import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { renderHook, act, waitFor } from '@/tests/tools'; // Usa el renderHook con providers
import { usePokemonList } from '../usePokemonList';
import { getPokemonList, getPokemonDetails } from '../../services/api';

// Mocks de API
vi.mock('../../services/api', async (importOriginal) => ({
  ...((await importOriginal()) as object),
  getPokemonList: vi.fn(),
  getPokemonDetails: vi.fn(),
}));

describe('usePokemonList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns true for isLoading when the requests are in process', () => {
    // Simulate unresolved promise to keep the loading state to true
    (getPokemonList as Mock).mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => usePokemonList());

    expect(result.current.isLoading).toBe(true);
  });

  it('returns the list of pokemon correctly', async () => {
    (getPokemonList as Mock).mockResolvedValue({
      count: 100,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    });

    (getPokemonDetails as Mock).mockImplementation((id) =>
      Promise.resolve({
        id,
        name: id === '1' ? 'bulbasaur' : 'ivysaur',
        image: '',
        abilities: [],
      }),
    );

    const { result } = renderHook(() => usePokemonList());

    // wait untill the getPokemonDetails requests are resolved
    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: 100,
    });

    expect(result.current.pokemonList).toEqual([
      { id: '1', name: 'bulbasaur', image: '', abilities: [] },
      { id: '2', name: 'ivysaur', image: '', abilities: [] },
    ]);
  });

  it('updates page when calling setCurrentPage', () => {
    const { result } = renderHook(() => usePokemonList());

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.currentPage).toBe(2);
  });
});
