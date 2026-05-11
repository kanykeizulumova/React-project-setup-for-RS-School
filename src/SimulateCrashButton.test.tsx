import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

test('Test the simulate crash button and check refresh button', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ results: [], info: { pages: 0 } }),
  });
  render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  const user = userEvent.setup();

  const CrashButton = screen.queryByRole('button', { name: /simulate/i });
  expect(CrashButton).toBeInTheDocument();

  await user.click(CrashButton);

  const errorMessage = await screen.findByText(/oops, something went wrong!/i);
  expect(errorMessage).toBeInTheDocument();

  const refreshButton = screen.getByRole('button', { name: /refresh/i });
  expect(refreshButton).toBeInTheDocument();

  expect(
    screen.queryByRole('button', { name: /simulate/i })
  ).not.toBeInTheDocument();
});

test('should call window.location.reload when Refresh button is clicked', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ results: [], info: { pages: 0 } }),
  });

  const reloadMock = vi.fn();

  vi.stubGlobal('location', {
    ...window.location,
    reload: reloadMock,
  });

  render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { name: /simulate/i }));
  const refreshButton = screen.getByRole('button', { name: /refresh/i });
  await user.click(refreshButton);

  expect(reloadMock).toHaveBeenCalled();

  vi.unstubAllGlobals();
});
