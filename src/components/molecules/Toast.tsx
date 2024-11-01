// src/components/atoms/MessageModal.tsx
import React from 'react';
import styles from '@/styles/molecules/Toast.module.scss';
import Text from '../atoms/Text';

interface MessageModalProps {
  type: 'success' | 'error'; // Message type
  message: string; // Message text content
  onClose: () => void; // Close modal function
}

const MessageModal: React.FC<MessageModalProps> = ({
  type,
  message,
  onClose,
}) => {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={`${styles.modal} ${styles[type]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Text color="white">{message}</Text>
        <button onClick={onClose} className={styles.closeButton}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
