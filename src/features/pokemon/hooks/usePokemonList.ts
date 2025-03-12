import { useEffect } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemonList, getPokemonDetails, LIMIT } from '../services/api';
import { RootState } from '@/app/store';
import { setCurrentPage } from '../store/pokemonSlice.ts';
import { useSearchParams } from 'react-router-dom';

export function usePokemonList() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.pokemon.currentPage);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: pokemonListData, isLoading: isListLoading } = useQuery({
    queryKey: ['pokemonList', currentPage],
    queryFn: () => getPokemonList(currentPage),
  });

  const pokemonQueries = useQueries({
    queries: (pokemonListData?.results || []).map((pokemon) => {
      const id = pokemon.url.split('/').slice(-2, -1)[0];
      return {
        queryKey: ['pokemonDetail', id],
        queryFn: () => getPokemonDetails(id),
        enabled: !!pokemonListData?.results,
      };
    }),
  });

  const isDetailsLoading = pokemonQueries.some((query) => query.isLoading);
  const pokemonDetails = pokemonQueries.map((query) => query.data).filter(Boolean);
  const totalPages = pokemonListData ? Math.ceil(pokemonListData.count / LIMIT) : 0;

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1');

    if (page !== currentPage) {
      dispatch(setCurrentPage(page));
    }
  }, [currentPage, searchParams, dispatch]);

  return {
    currentPage,
    totalPages,
    isLoading: isListLoading || isDetailsLoading,
    pokemonList: pokemonDetails,
    setCurrentPage: handlePageChange,
  };
}
