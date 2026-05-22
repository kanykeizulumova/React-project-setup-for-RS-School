import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';
import App from '../App';
import { ThemeProvider } from '../ThemeContext';

import useCheckboxStore from '../store/useCheckbox';

vi.mock('../store/useCheckbox', () => ({
  default: vi.fn(),
}));

const mockUnselectAll = vi.fn();
const mockGetSelectedCards = vi.fn().mockResolvedValue([]);
const mockHandleCheckboxChange = vi.fn();

const makeMockStore =
  (selectedIds: string[]) => (selector: (state: object) => unknown) =>
    selector({
      selectedIds,
      unselectAll: mockUnselectAll,
      getSelectedCards: mockGetSelectedCards,
      handleCheckboxChange: mockHandleCheckboxChange,
    });

test('flyout shows buttons when items are selected', () => {
  vi.mocked(useCheckboxStore).mockImplementation(makeMockStore(['1', '2']));

  render(
    <ThemeProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </ThemeProvider>
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
    <ThemeProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </ThemeProvider>
  );

  await user.click(screen.getByRole('button', { name: /unselect all/i }));

  expect(mockUnselectAll).toHaveBeenCalledTimes(1);
});

test('clicking Download calls getSelectedCards', async () => {
  vi.mocked(useCheckboxStore).mockImplementation(makeMockStore(['1', '2']));
  const user = userEvent.setup();

  render(
    <ThemeProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </ThemeProvider>
  );

  await user.click(screen.getByRole('button', { name: /download/i }));

  expect(mockGetSelectedCards).toHaveBeenCalled();
});

test('flyout hidden when no items selected', () => {
  vi.mocked(useCheckboxStore).mockImplementation(makeMockStore([]));

  const { container } = render(
    <ThemeProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </ThemeProvider>
  );

  const flyoutPanel = container.querySelector('.check-buttons-close');
  expect(flyoutPanel).toBeInTheDocument();

  const unselectBtn = flyoutPanel?.querySelector('button.unsellect');
  const downloadBtn = flyoutPanel?.querySelectorAll('button')[1];
  expect(unselectBtn).toBeInTheDocument();
  expect(downloadBtn).toBeInTheDocument();
});
