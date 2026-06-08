import { render, screen } from '@testing-library/react';
import { test, expect, vi, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Terms from '../routes/terms';

afterEach(() => {
  vi.restoreAllMocks();
});

test('Show terms content', async () => {
  globalThis.fetch = vi.fn();

  render(
    <MemoryRouter initialEntries={['/terms']}>
      <Terms />
    </MemoryRouter>
  );

  expect(screen.getByText(/Lorem ipsum dolor sit amet/i)).toBeInTheDocument();
});

test('Back to main button', async () => {
  globalThis.fetch = vi.fn();

  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/terms']}>
      <Terms />
    </MemoryRouter>
  );

  const backButton = await screen.findByRole('link', { name: /⬅️/i });
  await user.click(backButton);
  expect(screen.queryByRole('button', { name: /⬅️/i })).not.toBeInTheDocument();
});
