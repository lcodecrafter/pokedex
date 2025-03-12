import { describe, it, expect } from 'vitest';
import { PokemonCard } from '../PokemonCard';
import { render, screen } from '@/tests/tools';
import { pokemons } from '@/tests/mocks';

describe('PokemonCard Component', () => {
  const pokemon = pokemons[0];

  it('displays pokemon name in heading', () => {
    render(<PokemonCard {...pokemon} />);
    expect(screen.getByRole('heading', { name: pokemon.name })).toBeInTheDocument();
  });

  it('displays pokemon id with leading zeros inside the card', () => {
    render(<PokemonCard {...pokemon} />);

    const card = screen.getByRole('link', { name: new RegExp(pokemon.name, 'i') });
    expect(card).toHaveTextContent(`#${String(pokemon.id).padStart(3, '0')}`);
  });

  it('displays pokemon image when imageUrl is provided', () => {
    render(<PokemonCard {...pokemon} />);

    const image = screen.getByRole('img', { name: pokemon.name });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', pokemon.imageUrl);
    expect(image).toHaveAttribute('alt', pokemon.name);
  });

  it('links to pokemon detail page when clicked', () => {
    render(<PokemonCard {...pokemon} />);

    const link = screen.getByRole('link', { name: new RegExp(pokemon.name, 'i') });
    expect(link).toHaveAttribute('href', `/pokemon/${pokemon.id}`);
  });
});
