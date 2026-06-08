import { render, screen } from '@testing-library/react';
import { test, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import Modal from '../components/Modal';

vi.mock('../formsMap', () => ({
  formsMap: {
    TestForm: ({ onClose }: { onClose: () => void }) => (
      <div data-testid="mock-form">
        <input type="text" aria-label="Test input" />
        <button type="button" onClick={onClose}>
          Submit Test
        </button>
      </div>
    ),
  },
}));

beforeEach(() => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  document.body.innerHTML = '';
  document.body.style.overflow = '';
  vi.restoreAllMocks();
});

test('Modal does not render when isOpen is false', () => {
  const isModalOpen = false;
  render(
    <Modal isOpen={isModalOpen} onClose={vi.fn()} activeForm="TestForm" />
  );
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('Modal renders correctly when isOpen is true', () => {
  const isModalOpen = true;
  render(
    <Modal isOpen={isModalOpen} onClose={vi.fn()} activeForm="TestForm" />
  );
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByTestId('mock-form')).toBeInTheDocument();
});

test('Modal calls onClose when close button is clicked', async () => {
  const handleClose = vi.fn();
  const user = userEvent.setup();
  const isModalOpen = true;

  render(
    <Modal isOpen={isModalOpen} onClose={handleClose} activeForm="TestForm" />
  );

  const closeButton = screen.getByRole('button', { name: /Close modal/i });
  await user.click(closeButton);

  expect(handleClose).toHaveBeenCalledOnce();
});

test('Modal calls onClose when clicking on the overlay (outside content)', async () => {
  const handleClose = vi.fn();
  const user = userEvent.setup();
  const isModalOpen = true;

  render(
    <Modal isOpen={isModalOpen} onClose={handleClose} activeForm="TestForm" />
  );

  const overlay = screen.getByRole('presentation');
  await user.click(overlay);

  expect(handleClose).toHaveBeenCalledOnce();
});

test('Modal does NOT call onClose when clicking inside the modal content', async () => {
  const handleClose = vi.fn();
  const user = userEvent.setup();
  const isModalOpen = true;

  render(
    <Modal isOpen={isModalOpen} onClose={handleClose} activeForm="TestForm" />
  );

  const modalContent = screen.getByRole('dialog');
  await user.click(modalContent);

  expect(handleClose).not.toHaveBeenCalled();
});

test('Modal calls onClose when Escape key is pressed', async () => {
  const handleClose = vi.fn();
  const user = userEvent.setup();
  const isModalOpen = true;

  render(
    <Modal isOpen={isModalOpen} onClose={handleClose} activeForm="TestForm" />
  );

  await user.keyboard('{Escape}');

  expect(handleClose).toHaveBeenCalledOnce();
});

test('Modal disables background scrolling (overflow: hidden) when open', () => {
  const isModalOpen = true;
  const { unmount } = render(
    <Modal isOpen={isModalOpen} onClose={vi.fn()} activeForm="TestForm" />
  );

  expect(document.body.style.overflow).toBe('hidden');

  unmount();

  expect(document.body.style.overflow).toBe('');
});

test('Modal sets focus to the first focusable element when opened', () => {
  const isModalOpen = true;
  render(
    <Modal isOpen={isModalOpen} onClose={vi.fn()} activeForm="TestForm" />
  );

  const closeButton = screen.getByRole('button', { name: /Close modal/i });

  expect(document.activeElement).toBe(closeButton);
});

test('Modal renders fallback text if form component is not found', () => {
  const isModalOpen = true;
  render(
    <Modal isOpen={isModalOpen} onClose={vi.fn()} activeForm="UnknownForm123" />
  );

  expect(screen.getByText(/Form not found/i)).toBeInTheDocument();
});
