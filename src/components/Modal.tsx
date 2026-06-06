import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import { formsMap } from '../formsMap';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeForm: keyof typeof formsMap | string;
}

export default function Modal({ isOpen, onClose, activeForm }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const FormComponent = formsMap[activeForm as keyof typeof formsMap];

  return ReactDOM.createPortal(
    <div
      className="modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="presentation"
      aria-hidden="true"
    >
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={modalRef}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="form-container" id="modal-title">
          {FormComponent ? (
            <FormComponent onClose={onClose} />
          ) : (
            <p>Form not found</p>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
}
