import {
  render as rtlRender,
  renderHook as rtlRenderHook,
  screen,
  fireEvent,
  within,
  waitFor,
  act,
} from '@testing-library/react';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

// eslint-disable-next-line react-refresh/only-export-components
function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // deactivate retries
        staleTime: 0,
        gcTime: 0, // deactivate garbage collection

        // deactivate refetch
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });

  queryClient.clear(); //reset queryClient between tests
  return (
    <MemoryRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </Provider>
    </MemoryRouter>
  );
}

function render(ui: ReactNode) {
  return rtlRender(<Providers>{ui}</Providers>);
}

function renderHookWithProviders<T>(callback: () => T) {
  return rtlRenderHook(callback, { wrapper: Providers });
}

export { render, renderHookWithProviders as renderHook, screen, fireEvent, within, waitFor, act };
