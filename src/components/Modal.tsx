import ReactDOM from 'react-dom';
import React, { useEffect, cloneElement, isValidElement } from 'react';
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

  const currentForm = formsMap[activeForm as keyof typeof formsMap];

  return ReactDOM.createPortal(
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="modal" onClick={onClose}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose}>
          &times;
        </button>

        <div className="form-container">
          {isValidElement(currentForm) ? (
            cloneElement(
              currentForm as React.ReactElement<{ onClose: () => void }>,
              { onClose }
            )
          ) : (
            <p>Form not found</p>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
}
