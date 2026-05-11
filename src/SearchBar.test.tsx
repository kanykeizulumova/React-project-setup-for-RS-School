import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import SearchBar from './Searchbar';

test('calls onSearchClick when the Search button is clicked', async () => {
  // 1. Create a "spy" (dummy function)
  const onSearchSpy = vi.fn();
  const user = userEvent.setup();

  // 2. Render the component
  render(
    <SearchBar
      value="Rick"
      onChange={() => {}}
      onSearchClick={onSearchSpy}
      onReset={() => {}}
    />
  );

  // 3. Find the button and click
  const searchButton = screen.getByRole('button', { name: /search/i });
  await user.click(searchButton);

  // CHECK 1: Was there a call at all?
  expect(onSearchSpy).toHaveBeenCalled();

  // CHECK 2: Was the call made exactly once?
  expect(onSearchSpy).toHaveBeenCalledTimes(1);
});

test('calls onSearchClick when you press enter', async () => {
  const onSearchSpy = vi.fn();
  const user = userEvent.setup();

  render(
    <SearchBar
      value="Rick"
      onChange={() => {}}
      onSearchClick={onSearchSpy}
      onReset={() => {}}
    />
  );

  // Find the input
  const input = screen.getByPlaceholderText(/Type name.../i);
  await user.type(input, 'Rick{Enter}');

  expect(onSearchSpy).toHaveBeenCalled();

  expect(onSearchSpy).toHaveBeenCalledTimes(1);
});

test('The reset button is NOT displayed if the search value is empty.', () => {
  render(
    <SearchBar
      value="" // empty value
      onChange={() => {}}
      onSearchClick={() => {}}
      onReset={() => {}}
    />
  );

  const resetButton = screen.queryByRole('button', { name: /reset/i });
  expect(resetButton).not.toBeInTheDocument();
});

test('reset button is displayed if the search value is not empty.', async () => {
  const onResetSpy = vi.fn();
  const user = userEvent.setup();
  render(
    <SearchBar
      value="Rick"
      onChange={() => {}}
      onSearchClick={() => {}}
      onReset={onResetSpy}
    />
  );

  const resetButton = screen.queryByRole('button', { name: /reset/i });

  expect(resetButton).toBeInTheDocument();
  await user.click(resetButton);

  expect(onResetSpy).toHaveBeenCalledTimes(1);
});
