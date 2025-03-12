import { PokemonCard } from '../components/PokemonCard';
import { Pagination } from '../components/Pagination';
import { Spinner } from '@/components/ui/Spinner';
import { usePokemonList } from '../hooks/usePokemonList';
import { Link } from 'react-router-dom';

export function PokemonList() {
  const { currentPage, totalPages, isLoading, pokemonList, setCurrentPage } = usePokemonList();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/">
        <h1 className="mb-8 text-4xl font-bold text-center bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">
          Pokédex
        </h1>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonList?.map(
          (pokemon) =>
            pokemon && (
              <PokemonCard
                key={pokemon.id}
                name={pokemon.name}
                id={pokemon.id}
                imageUrl={pokemon.imageUrl}
              />
            ),
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
}
