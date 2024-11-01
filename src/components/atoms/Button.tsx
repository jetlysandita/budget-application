// components/atoms/Button/Button.tsx

import React from 'react';
import styles from '@/styles/atoms/Button.module.scss';
import IconSpinner from './IconSpinner';

interface ButtonProps {
  children: React.ReactNode;
  theme?: 'primary' | 'secondary'; // Theme type
  size?: 'small' | 'medium' | 'large'; // Size type
  onClick?: () => void; // Click event handler
  isLoading?: boolean; // Loading state
}

const Button: React.FC<ButtonProps> = ({
  children,
  theme = 'primary', // Default theme
  size = 'medium', // Default size
  onClick,
  isLoading = false, // Default loading state
}) => {
  return (
    <button
      className={`${styles.button} ${styles[theme]} ${styles[size]} ${
        isLoading ? styles.loading : ''
      }`}
      onClick={onClick}
      disabled={isLoading} // Disable button while loading
    >
      {isLoading ? <IconSpinner className={`${styles.rotate}`} /> : children}
    </button>
  );
};

export default Button;
