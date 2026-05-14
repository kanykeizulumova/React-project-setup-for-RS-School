import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import NotFound from '../routes/Notfound';

afterEach(() => {
  vi.restoreAllMocks();
});

test('Show message', async () => {
  globalThis.fetch = vi.fn();

  render(
    <MemoryRouter initialEntries={['/404']}>
      <NotFound />
    </MemoryRouter>
  );

  expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
});

test('Back to main button', async () => {
  globalThis.fetch = vi.fn();

  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/404']}>
      <NotFound />
    </MemoryRouter>
  );

  const bacttoButton = await screen.findByRole('link', { name: /⬅️/i });
  await user.click(bacttoButton);
  expect(screen.queryByRole('button', { name: /⬅️/i })).not.toBeInTheDocument();
});
