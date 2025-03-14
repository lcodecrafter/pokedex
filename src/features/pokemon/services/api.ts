import { createFetchClient } from '@/lib/fetchClient';
import { Pokemon, PokemonListResponse, PokemonResponse } from '../models/pokemon';

export const LIMIT = 16;

const defaultFetchClient = createFetchClient(import.meta.env.VITE_POKEAPI_BASE_URL);

export const getPokemonList = async (
  page: number,
  fetchClient = defaultFetchClient,
): Promise<PokemonListResponse> => {
  const offset = (page - 1) * LIMIT;
  const response = await fetchClient<PokemonListResponse>(
    `/pokemon?limit=${LIMIT}&offset=${offset}`,
  );

  return response;
};

export const getPokemonDetails = async (
  pokemonId: string,
  fetchClient = defaultFetchClient,
): Promise<Pokemon> => {
  const { id, name, abilities, sprites } = await fetchClient<PokemonResponse>(
    `/pokemon/${pokemonId}`,
  );
  return { id, name, abilities, imageUrl: sprites.other['official-artwork'].front_default };
};
