// src/components/Modal.tsx

import React from 'react';
import styles from '@/styles/atoms/Modal.module.scss'; // Importing SCSS styles

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Do not render modal if it's not open

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles.modal}>
        <div className={styles['modal-header']}>
          <h2 className={styles['modal-title']}>{title}</h2>
          <button className={styles['modal-close']} onClick={onClose}>
            &times; {/* Close button */}
          </button>
        </div>
        <div className={styles['modal-content']}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
