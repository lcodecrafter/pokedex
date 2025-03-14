import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Error } from '@/pages/error';
import { Base } from '../layouts/Base';
import { PokemonList } from '@/features/pokemon/pages/PokemonsList';
import { PokemonDetail } from '@/features/pokemon/pages/PokemonDetail';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Base />} errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route index element={<PokemonList />} />
        <Route path="pokemon/:id" element={<PokemonDetail />} />
      </Route>
    </Route>,
  ),
);
