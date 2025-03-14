import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent } from '@/tests/tools';
import { PokemonDetail } from '../PokemonDetail';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import { useNavigate } from 'react-router-dom';
import { pokemons } from '@/tests/mocks';

vi.mock('../../hooks/usePokemonDetail');

vi.mock('react-router-dom', async (importOriginal) => ({
  ...((await importOriginal()) as object),
  useNavigate: vi.fn(),
}));

describe('PokemonDetail Component', () => {
  const mockNavigate = useNavigate as unknown as Mock;
  let mockUsePokemonDetail: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePokemonDetail = usePokemonDetail as unknown as Mock;
  });

  it('displays loading spinner when fetching data', () => {
    mockUsePokemonDetail.mockReturnValue({
      pokemon: undefined,
      pokemonId: 1,
      isLoading: true,
      isError: false,
    });

    render(<PokemonDetail />);
    expect(screen.getByRole('status')).toBeInTheDocument(); // Asegura que el Spinner está presente
  });

  it('displays error message and return button when error occurs', () => {
    mockUsePokemonDetail.mockReturnValue({
      pokemon: undefined,
      pokemonId: 1,
      isLoading: false,
      isError: true,
    });

    render(<PokemonDetail />);

    expect(screen.getByRole('alert')).toHaveTextContent(/Failed to load Pokémon details/i);
    expect(screen.getByRole('button', { name: /return home/i })).toBeInTheDocument();
  });

  it('displays Pokémon details correctly', () => {
    const pokemon = pokemons[0];
    const pokemonName = new RegExp(pokemon.name, 'i');
    mockUsePokemonDetail.mockReturnValue({
      pokemon: pokemon,
      pokemonId: pokemon.id,
      isLoading: false,
      isError: false,
    });

    render(<PokemonDetail />);

    expect(screen.getByRole('heading', { name: pokemonName })).toBeInTheDocument();
    expect(screen.getByRole('text', { name: /pokemon id \d+/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: pokemonName })).toHaveAttribute('src', pokemon.imageUrl);

    for (const ability of pokemon.abilities) {
      expect(screen.getByText(new RegExp(ability.ability.name, 'i'))).toBeInTheDocument();
    }
  });

  it("navigates to home when clicking 'Return Home' button", () => {
    const navigateMock = vi.fn();
    mockNavigate.mockReturnValue(navigateMock);
    mockUsePokemonDetail.mockReturnValue({
      pokemon: null,
      pokemonId: 10,
      isLoading: false,
      isError: true,
    });

    render(<PokemonDetail />);

    const homeButton = screen.getByRole('button', { name: /return home/i });
    fireEvent.click(homeButton);

    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it("navigates to previous Pokémon when clicking 'Previous'", () => {
    const pokemon = pokemons[1];
    const pokemonId = pokemon.id;
    const navigateMock = vi.fn();
    mockNavigate.mockReturnValue(navigateMock);
    mockUsePokemonDetail.mockReturnValue({
      pokemon,
      pokemonId: pokemonId,
      isLoading: false,
      isError: false,
    });

    render(<PokemonDetail />);

    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeInTheDocument();

    fireEvent.click(prevButton);

    expect(navigateMock).toHaveBeenCalledWith(`/pokemon/${pokemonId - 1}`);
  });

  it("navigates to next Pokémon when clicking 'Next'", () => {
    const pokemon = pokemons[0];
    const navigateMock = vi.fn();
    mockNavigate.mockReturnValue(navigateMock);

    mockUsePokemonDetail.mockReturnValue({
      pokemon,
      pokemonId: pokemon.id,
      isLoading: false,
      isError: false,
    });

    render(<PokemonDetail />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    expect(navigateMock).toHaveBeenCalledWith(`/pokemon/${pokemon.id + 1}`);
  });
});
