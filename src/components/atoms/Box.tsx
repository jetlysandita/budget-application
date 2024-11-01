import React, { CSSProperties } from 'react';
import styles from '@/styles/atoms/Box.module.scss';

type BoxProps = {
  children: React.ReactNode;
  backgroundColor?: string; // Optional prop for background color
  padding?: string; // Optional prop for padding (e.g., '10px' or '1rem')
  margin?: string; // Optional prop for margin (e.g., '10px' or '1rem')
  height?: string; // Optional prop for height (e.g., '100px' or '50%')
  width?: string; // Optional prop for width (e.g., '100%' or '300px')
  className?: string; // Optional additional class names
  position?: CSSProperties['position'];
  bottom?: string;
};

const Box: React.FC<BoxProps> = ({
  children,
  backgroundColor = 'transparent', // Default to transparent if not provided
  padding = '0', // Default to no padding if not provided
  margin = '0', // Default to no margin if not provided
  height = 'auto', // Default to auto height if not provided
  width = 'auto', // Default to auto width if not provided
  className = '', // Additional class names
  position,
  bottom,
}) => {
  return (
    <div
      className={`${styles.box} ${className}`} // Combine styles
      style={{
        backgroundColor,
        padding,
        margin,
        height,
        width,
        position,
        bottom,
      }}
    >
      {children}
    </div>
  );
};

export default Box;
