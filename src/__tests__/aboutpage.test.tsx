import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import About from '../routes/aboutpage';

afterEach(() => {
  vi.restoreAllMocks();
});

test('Show message', async () => {
  globalThis.fetch = vi.fn();

  render(
    <MemoryRouter initialEntries={['/about']}>
      <About />
    </MemoryRouter>
  );

  expect(
    screen.getByText(/This app was made by Kanykei Zulumova/i)
  ).toBeInTheDocument();
});

test('Back to main button', async () => {
  globalThis.fetch = vi.fn();

  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/about']}>
      <About />
    </MemoryRouter>
  );

  const bacttoButton = await screen.findByRole('link', { name: /⬅️/i });
  await user.click(bacttoButton);
  expect(screen.queryByRole('button', { name: /⬅️/i })).not.toBeInTheDocument();
});
