import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPokemonDetails } from '../services/api';

export function usePokemonDetail() {
  const { id } = useParams<{ id: string }>();
  const pokemonId = id || '1';

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['pokemonDetail', String(pokemonId)],
    queryFn: () => getPokemonDetails(String(pokemonId)),
    enabled: !!id,
  });

  return {
    pokemon,
    pokemonId: parseInt(id || '1'),
    isLoading,
    isError,
  };
}
