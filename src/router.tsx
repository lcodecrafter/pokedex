import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Error } from '@/pages/error';
import { Base } from './layouts/Base';
import { Home } from './pages/Home';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Base />} errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route index element={<Home />} />
      </Route>
    </Route>,
  ),
);
