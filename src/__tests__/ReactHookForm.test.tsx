import { render, screen } from '@testing-library/react';
import { test, expect, vi, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import ReactHookForm from '../forms/ReactHookForm';

afterEach(() => {
  vi.restoreAllMocks();
});

test('Render main form fields', () => {
  render(
    <MemoryRouter>
      <ReactHookForm onClose={vi.fn()} />
    </MemoryRouter>
  );

  expect(screen.getByLabelText(/Your full name:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Your age:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Enter Email:/i)).toBeInTheDocument();
  const radioButtons = screen.getAllByRole('radio');
  expect(radioButtons).toHaveLength(2);
});

test('Submit button is disabled initially', () => {
  render(
    <MemoryRouter>
      <ReactHookForm onClose={vi.fn()} />
    </MemoryRouter>
  );

  const submitButton = screen.getByRole('button', { name: /Submit/i });
  expect(submitButton).toBeDisabled();
});

test('Render main form fields', () => {
  render(
    <MemoryRouter>
      <ReactHookForm onClose={vi.fn()} />
    </MemoryRouter>
  );

  expect(screen.getByLabelText(/Your full name:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Your age:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Enter Email:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Upload image:/i)).toBeInTheDocument();
});

test('Submit button is disabled initially', () => {
  render(
    <MemoryRouter>
      <ReactHookForm onClose={vi.fn()} />
    </MemoryRouter>
  );

  const submitButton = screen.getByRole('button', { name: /Submit/i });
  expect(submitButton).toBeDisabled();
});

test('Shows validation error for invalid email', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <ReactHookForm onClose={vi.fn()} />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText(/Enter Email:/i);
  await user.type(emailInput, 'invalid-email');

  await user.tab();

  expect(
    await screen.findByText(/Incorrect email format/i)
  ).toBeInTheDocument();
});

test('Shows password strength indicator when typing', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <ReactHookForm onClose={vi.fn()} />
    </MemoryRouter>
  );

  const passwordInputs = screen.getAllByLabelText(/Password/i);
  const mainPasswordInput = passwordInputs[0];

  await user.type(mainPasswordInput, 'StrongP@ss1!');

  expect(await screen.findByText(/Strength: Strong/i)).toBeInTheDocument();
});
