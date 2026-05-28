import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CharacterDetails from '../routes/CharacterDetails';

afterEach(() => {
  vi.restoreAllMocks();
});

test('should show "Nothing found" message on 404 error', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 404,
  });
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/?details=1']}>
        <CharacterDetails />
      </MemoryRouter>
    </QueryClientProvider>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('Close button close panel', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      name: 'Rick',
      image: '',
      species: 'Human',
      gender: 'Male',
      status: 'Alive',
      location: { name: 'Earth' },
      origin: { name: 'Earth' },
      episode: [],
      url: '',
    }),
  });
  const queryClient = new QueryClient();

  const user = userEvent.setup();
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/?details=1']}>
        <CharacterDetails />
      </MemoryRouter>
    </QueryClientProvider>
  );

  const closeButton = await screen.findByRole('button', { name: /X/i });
  await user.click(closeButton);
  expect(screen.queryByRole('button', { name: /X/i })).not.toBeInTheDocument();
});
