import { render, screen } from '@testing-library/react';
import { test, expect, vi, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import UncontrolledForm from '../forms/UncontrolledForm';

afterEach(() => {
  vi.restoreAllMocks();
});

test('Render form fields', () => {
  render(
    <MemoryRouter>
      <UncontrolledForm onClose={vi.fn()} />
    </MemoryRouter>
  );

  expect(screen.getByLabelText(/Your full name:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Your age:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Enter Email:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Upload image:/i)).toBeInTheDocument();
  const radioButtons = screen.getAllByRole('radio');
  expect(radioButtons).toHaveLength(2);
});

test('Has password input field', () => {
  render(
    <MemoryRouter>
      <UncontrolledForm onClose={vi.fn()} />
    </MemoryRouter>
  );

  const passwordInput = document.querySelector(
    'input[name="password"]'
  ) as HTMLInputElement;
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput.type).toBe('password');
});

test('Has upload image field', () => {
  render(
    <MemoryRouter>
      <UncontrolledForm onClose={vi.fn()} />
    </MemoryRouter>
  );

  const uploadInput = screen.getByLabelText(/Upload image:/i);
  expect(uploadInput).toBeInTheDocument();
});

test('Has submit button', () => {
  render(
    <MemoryRouter>
      <UncontrolledForm onClose={vi.fn()} />
    </MemoryRouter>
  );

  const submitButton = screen.getByRole('button', { name: /Submit/i });
  expect(submitButton).toBeInTheDocument();
});

test('Submit button is enabled initially', () => {
  render(
    <MemoryRouter>
      <UncontrolledForm onClose={vi.fn()} />
    </MemoryRouter>
  );

  const submitButton = screen.getByRole('button', { name: /Submit/i });
  expect(submitButton).toBeEnabled();
});

test('Shows multiple validation errors when submitting empty form', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <UncontrolledForm onClose={vi.fn()} />
    </MemoryRouter>
  );

  const submitButton = screen.getByRole('button', { name: /Submit/i });
  await user.click(submitButton);

  expect(
    await screen.findByText(/The first letter must be uppercase/i)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(/Incorrect email format/i)
  ).toBeInTheDocument();
});

test('Shows password strength indicator and toggles visibility', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <UncontrolledForm onClose={vi.fn()} />
    </MemoryRouter>
  );

  const passwordInputs = screen.getAllByLabelText(/Password/i);
  const mainPasswordInput = passwordInputs[0];

  await user.type(mainPasswordInput, '123');

  expect(await screen.findByText(/Strength: Weak/i)).toBeInTheDocument();
  expect(mainPasswordInput).toHaveAttribute('type', 'password');

  const toggleButton =
    mainPasswordInput.nextElementSibling as HTMLButtonElement;
  await user.click(toggleButton);

  expect(mainPasswordInput).toHaveAttribute('type', 'text');
});
