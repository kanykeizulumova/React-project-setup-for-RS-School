import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { formsMap } from '../formsMap';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeForm: keyof typeof formsMap | string;
}

export default function Modal({ isOpen, onClose, activeForm }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const FormComponent = formsMap[activeForm as keyof typeof formsMap];

  return ReactDOM.createPortal(
    <div className="modal" onClick={onClose} role="presentation">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <button type="button" className="modal-close" onClick={onClose}>
          &times;
        </button>

        <div className="form-container">
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
