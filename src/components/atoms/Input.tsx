// src/components/atoms/Input.tsx

import React, { forwardRef } from 'react';
import styles from '@/styles/atoms/Input.module.scss';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'small' | 'medium' | 'large';
  error?: boolean;
  required?: boolean;
}

// Using React.forwardRef to pass the ref down to the input element
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      placeholder,
      value,
      onChange,
      size = 'medium',
      error = false,
      required,
    },
    ref,
  ) => {
    const sizeClass =
      size === 'small' ? styles.small : size === 'large' ? styles.large : '';

    return (
      <input
        type={type}
        ref={ref} // Forward the ref to the input element
        required={required}
        className={`${styles.input} ${sizeClass} ${error ? styles.error : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  },
);

Input.displayName = 'Input'; // Helpful for React DevTools

export default Input;
