import { Outlet } from 'react-router-dom';

export function Base() {
  return (
    <main className="w-full min-h-screen bg-gray-50">
      <Outlet />
    </main>
  );
}
