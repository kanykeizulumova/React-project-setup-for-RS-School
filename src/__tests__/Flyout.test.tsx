import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';
import { ThemeProvider } from '../ThemeContext';

import useCheckboxStore, { type CheckboxStore } from '../store/useCheckbox';
import fetchSelectedCharacters from '../fetchSelectedCharacters';

vi.mock('../store/useCheckbox', () => ({
  default: vi.fn(),
}));

vi.mock('../fetchSelectedCharacters', () => ({
  default: vi.fn().mockResolvedValue([]),
}));

const mockUnselectAll = vi.fn();
const mockHandleCheckboxChange = vi.fn();

const makeMockStore =
  (selectedIds: string[]) => (selector: (state: CheckboxStore) => unknown) =>
    selector({
      selectedIds,
      unselectAll: mockUnselectAll,
      handleCheckboxChange: mockHandleCheckboxChange,
    } as CheckboxStore);

test('flyout shows buttons when items are selected', () => {
  vi.mocked(useCheckboxStore).mockImplementation(makeMockStore(['1', '2']));

  render(
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );

  expect(
    screen.getByRole('button', { name: /unselect all/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument();
});

test('clicking Unselect all calls unselectAll', async () => {
  vi.mocked(useCheckboxStore).mockImplementation(makeMockStore(['1', '2']));
  const user = userEvent.setup();

  render(
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );

  await user.click(screen.getByRole('button', { name: /unselect all/i }));

  expect(mockUnselectAll).toHaveBeenCalledTimes(1);
});

test('clicking Download calls getSelectedCards', async () => {
  vi.mocked(useCheckboxStore).mockImplementation(makeMockStore(['1', '2']));
  const user = userEvent.setup();

  render(
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );

  await user.click(screen.getByRole('button', { name: /download/i }));
  expect(fetchSelectedCharacters).toHaveBeenCalled();
});

test('flyout hidden when no items selected', () => {
  vi.mocked(useCheckboxStore).mockImplementation(makeMockStore([]));

  const { container } = render(
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );

  const flyoutPanel = container.querySelector('.check-buttons-close');
  expect(flyoutPanel).toBeInTheDocument();

  const unselectBtn = flyoutPanel?.querySelector('button.unsellect');
  const downloadBtn = flyoutPanel?.querySelectorAll('button')[1];
  expect(unselectBtn).toBeInTheDocument();
  expect(downloadBtn).toBeInTheDocument();
});
