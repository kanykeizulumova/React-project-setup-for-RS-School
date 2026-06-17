import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import Card from '../components/Card';

test('Shows characters name', () => {
  const mockData = {
    id: '1',
    name: 'Rick Sanchez',
    species: 'Human',
    status: 'Alive',
    gender: 'Male',
    location: 'Earth',
    imageUrl: 'https://example.com/rick.png',
  };

  render(
    <MemoryRouter>
      <Card
        id={mockData.id}
        name={mockData.name}
        species={mockData.species}
        status={mockData.status}
        gender={mockData.gender}
        location={mockData.location}
        imageUrl={mockData.imageUrl}
      />
    </MemoryRouter>
  );

  const altText = screen.getByAltText('Rick Sanchez');
  expect(altText).toBeInTheDocument();

  const image = screen.getByAltText(/Rick Sanchez/i);
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'https://example.com/rick.png');

  const statusPill = screen.getByText(/Alive/i);
  expect(statusPill).toHaveClass('status-pill');
  expect(statusPill).toHaveClass('alive');

  const nameElement = screen.getByRole('heading', { name: /rick sanchez/i });
  expect(nameElement).toBeInTheDocument();

  const statusElement = screen.getByText(/Alive/i);
  expect(statusElement).toBeInTheDocument();

  const speciesElement = screen.getByText(/Human/i);
  expect(speciesElement).toBeInTheDocument();

  const genderElement = screen.getByText(/Male/i);
  expect(genderElement).toBeInTheDocument();

  const LocationElement = screen.getByText(/Earth/i);
  expect(LocationElement).toBeInTheDocument();
});

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
  };
});

test('transition to details panel when you click on the card', async () => {
  const mockData = {
    id: '1',
    name: 'Rick Sanchez',
    species: 'Human',
    status: 'Alive',
    gender: 'Male',
    location: 'Earth',
    imageUrl: 'https://example.com/rick.png',
  };

  render(
    <MemoryRouter>
      <Card
        id={mockData.id}
        name={mockData.name}
        species={mockData.species}
        status={mockData.status}
        gender={mockData.gender}
        location={mockData.location}
        imageUrl={mockData.imageUrl}
      />
    </MemoryRouter>
  );

  const user = userEvent.setup();
  const card = screen.getByRole('button', { name: /rick sanchez/i });
  await user.click(card);
  expect(mockNavigate).toHaveBeenCalledWith('/?details=1');
});

test('transition to details panel when you press keydown enter', async () => {
  const mockData = {
    id: '1',
    name: 'Rick Sanchez',
    species: 'Human',
    status: 'Alive',
    gender: 'Male',
    location: 'Earth',
    imageUrl: 'https://example.com/rick.png',
  };

  render(
    <MemoryRouter>
      <Card
        id={mockData.id}
        name={mockData.name}
        species={mockData.species}
        status={mockData.status}
        gender={mockData.gender}
        location={mockData.location}
        imageUrl={mockData.imageUrl}
      />
    </MemoryRouter>
  );

  const user = userEvent.setup();
  const card = screen.getByRole('button', { name: /rick sanchez/i });
  await user.type(card, '{Enter}');
  await user.type(card, '[Space]');
  expect(mockNavigate).toHaveBeenCalledWith('/?details=1');
});
