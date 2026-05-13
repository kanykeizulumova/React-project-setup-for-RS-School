import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import App from '../App';

afterEach(() => {
  vi.restoreAllMocks();
});

test('renders search bar', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ results: [], info: { pages: 0 } }),
  });

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByPlaceholderText(/Type name.../i)).toBeInTheDocument();
});

test('shows loading state', async () => {
  globalThis.fetch = vi.fn().mockImplementation(() => new Promise(() => {})); // Never resolves

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('Search on searchbar', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      results: [
        {
          id: 1,
          name: 'Test Rick',
          image: '',
          location: { name: 'Mars' },
          species: 'Human',
          status: 'Alive',
          gender: 'Male',
        },
      ],
      info: { pages: 1 },
    }),
  });
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText(/Type name.../i);
  await user.type(input, 'Rick{Enter}');
  const searchButton = screen.getByRole('button', { name: /search/i });
  await user.click(searchButton);

  const nameElement = await screen.findByRole('heading', {
    name: /test rick/i,
  });
  expect(nameElement).toBeInTheDocument();
  expect(screen.getByText(/Status: Alive/i)).toBeInTheDocument();
});

test('displays an error message when the server crashes', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 500,
  });

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const errorMessage = await screen.findByText(/Server error: 500/i);

  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveClass('error-msg');
});

test('should show "Nothing found" message on 404 error', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 404,
  });

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  const nothingFoundMsg = await screen.findByText(/nothing found/i);

  expect(nothingFoundMsg).toBeInTheDocument();

  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});

test('Previous button work', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      results: [
        {
          id: 1,
          name: 'Test Rick',
          image: '',
          location: { name: 'Mars' },
          species: 'Human',
          status: 'Alive',
          gender: 'Male',
        },
      ],
      info: { pages: 2 },
    }),
  });

  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const prevButton = await screen.findByRole('button', { name: /previous/i });

  expect(prevButton).toBeDisabled();

  const nextButton = screen.getByRole('button', { name: /next/i });
  await user.click(nextButton);

  const prevButtonEnabled = await screen.findByRole('button', {
    name: /previous/i,
  });
  expect(prevButtonEnabled).toBeEnabled();

  await user.click(prevButtonEnabled);

  const finalPrevButton = await screen.findByRole('button', {
    name: /previous/i,
  });
  expect(finalPrevButton).toBeDisabled();
});

test('reset button clears input and localStorage', async () => {
  localStorage.setItem('searchQuery', 'Rick');

  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const resetButton = await screen.findByRole('button', { name: /reset/i });
  await user.click(resetButton);

  expect(screen.getByPlaceholderText(/Type name.../i)).toHaveValue('');

  expect(localStorage.getItem('searchQuery')).toBe('');
});

test('reads search term from localStorage on mount', async () => {
  localStorage.setItem('searchQuery', 'Rick');

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText(/Type name.../i);
  expect(input).toHaveValue('Rick');
});

test('writes search term to localStorage on search', async () => {
  localStorage.clear();
  const user = userEvent.setup();

  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ results: [], info: { pages: 0 } }),
  });

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText(/Type name.../i);
  await user.type(input, 'Morty');
  const searchButton = screen.getByRole('button', { name: /search/i });
  await user.click(searchButton);

  expect(localStorage.getItem('searchQuery')).toBe('Morty');
});
