import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import CardList from '../Cardlist';

test('No character found test', () => {
  render(
    <MemoryRouter>
      <CardList
        items={[]}
        onNext={vi.fn()}
        onPrev={vi.fn()}
        currentPage={1}
        totalPages={0}
      />
    </MemoryRouter>
  );

  expect(screen.getByText(/No results found/i)).toBeInTheDocument();

  const nextButton = screen.queryByRole('button', { name: /next/i });
  expect(nextButton).not.toBeInTheDocument();
  const prevButton = screen.queryByRole('button', { name: /previous/i });
  expect(prevButton).not.toBeInTheDocument();
});

test('Next button click', async () => {
  const user = userEvent.setup();
  const onNextMock = vi.fn();
  const mockItems = [
    {
      id: '1',
      name: 'Rick Sanchez',
      species: 'Human',
      status: 'Alive',
      gender: 'Male',
      location: 'Earth',
      imageUrl: 'https://example.com/rick.png',
    },
    {
      id: '2',
      name: 'Morty Smith',
      species: 'Human',
      status: 'Alive',
      gender: 'Male',
      location: 'Earth',
      imageUrl: 'https://example.com/morty.png',
    },
  ];
  render(
    <MemoryRouter>
      <CardList
        items={mockItems}
        onNext={onNextMock}
        onPrev={vi.fn()}
        currentPage={2}
        totalPages={5}
      />
    </MemoryRouter>
  );

  const nextButton = screen.getByRole('button', { name: /next/i });
  expect(nextButton).toBeEnabled();
  await user.click(nextButton);

  expect(onNextMock).toHaveBeenCalled();
});
