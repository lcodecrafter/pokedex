import { useNavigate } from 'react-router-dom';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { Home } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Spinner } from '@/components/ui/spinner';

export function PokemonDetail() {
  const { pokemon, pokemonId, isLoading, isError } = usePokemonDetail();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (isError || !pokemon) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">Failed to load Pokémon details</p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
        >
          <Home className="w-5 h-5" />
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          <Navigation
            onPrevious={() => navigate(`/pokemon/${pokemonId - 1}`)}
            onNext={() => navigate(`/pokemon/${pokemonId + 1}`)}
            disablePrevious={pokemonId === 1}
            className="gap-2"
          />
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-500 text-sm mb-2">#{String(pokemon.id).padStart(3, '0')}</p>
          <h1 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h1>
          <img src={pokemon.imageUrl} alt={pokemon.name} className="w-64 h-64 mx-auto" />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Abilities</h2>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ability, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm capitalize">
                {ability.ability.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
