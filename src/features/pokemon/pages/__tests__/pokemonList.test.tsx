import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent } from '@/tests/tools';
import { PokemonList } from '../PokemonsList';
import { usePokemonList } from '../../hooks/usePokemonList';
import { pokemons as mockPokemons } from '@/tests/mocks';

vi.mock('../../hooks/usePokemonList');

describe('PokemonList Page', () => {
  let mockUsePokemonList: Mock;

  beforeEach(() => {
    mockUsePokemonList = usePokemonList as unknown as Mock;
    vi.clearAllMocks();
  });

  it('shows loading spinner when fetching data', () => {
    mockUsePokemonList.mockReturnValue({
      pokemonList: [],
      isLoading: true,
      currentPage: 1,
      totalPages: 5,
      setCurrentPage: vi.fn(),
    });

    render(<PokemonList />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading...');
  });

  it('renders the list of Pokémon correctly', () => {
    mockUsePokemonList.mockReturnValue({
      pokemonList: mockPokemons,
      isLoading: false,
      currentPage: 1,
      totalPages: 5,
      setCurrentPage: vi.fn(),
    });

    render(<PokemonList />);

    for (const pokemon of mockPokemons) {
      expect(
        screen.getByRole('heading', { name: new RegExp(pokemon.name, 'i') }),
      ).toBeInTheDocument();
    }
  });

  it('shows the Pokédex title', () => {
    mockUsePokemonList.mockReturnValue({
      pokemonList: [],
      isLoading: false,
      currentPage: 1,
      totalPages: 5,
      setCurrentPage: vi.fn(),
    });

    render(<PokemonList />);
    expect(screen.getByRole('heading', { name: /Pokédex/i })).toBeInTheDocument();
  });

  it('calls setCurrentPage when clicking next page button', () => {
    const setCurrentPageMock = vi.fn();

    mockUsePokemonList.mockReturnValue({
      pokemonList: mockPokemons,
      isLoading: false,
      currentPage: 1,
      totalPages: 5,
      setCurrentPage: setCurrentPageMock,
    });

    render(<PokemonList />);

    const paginationNextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(paginationNextButton);

    expect(setCurrentPageMock).toHaveBeenCalledWith(2);
  });
});
