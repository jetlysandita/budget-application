// components/atoms/Text/Text.tsx

import React from 'react';
import styles from '@/styles/atoms/Text.module.scss';

interface TextProps {
  children: React.ReactNode;
  size?: string; // e.g., "16px", "1.5rem"
  color?: string; // e.g., "#333"
  margin?: string; // e.g., "10px"
  padding?: string; // e.g., "5px"
  textAlign?: 'left' | 'center' | 'right';
  width?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  size = '16px',
  color = '#000',
  margin = '0',
  padding = '0',
  textAlign = 'left',
  width = 'auto',
}) => {
  return (
    <span
      className={styles.text}
      style={{
        fontSize: size,
        color: color,
        margin: margin,
        padding: padding,
        textAlign: textAlign,
        width,
      }}
    >
      {children}
    </span>
  );
};

export default Text;
