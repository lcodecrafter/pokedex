import { Link } from 'react-router-dom';

interface PokemonCardProps {
  name: string;
  id: number;
  imageUrl: string;
}

export function PokemonCard({ name, id, imageUrl }: PokemonCardProps) {
  return (
    <Link
      to={`/pokemon/${id}`}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <img src={imageUrl} alt={name} className="w-32 h-32 mb-4 object-contain" loading="lazy" />
      <div className="text-center">
        <p className="mb-1 text-gray-500 text-sm">#{String(id).padStart(3, '0')}</p>
        <h2 className="text-lg font-medium capitalize">{name}</h2>
      </div>
    </Link>
  );
}
