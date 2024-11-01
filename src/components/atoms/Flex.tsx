// components/atoms/Flex/Flex.tsx

import React from 'react';
import styles from '@/styles/atoms/Flex.module.scss';

interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'column'; // Flex direction
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch'; // Align items
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'; // Justify content
  style?: React.CSSProperties; // Additional styles
  gap?: string;
  backgroundColor?: string;
  margin?: string;
  padding?: string;
  width?: string;
  height?: string;
}

const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  alignItems = 'flex-start',
  justifyContent = 'flex-start',
  style,
  gap,
  margin,
  padding,
  backgroundColor,
  width,
  height,
}) => {
  return (
    <div
      className={styles.flex}
      style={{
        flexDirection: direction,
        alignItems: alignItems,
        justifyContent: justifyContent,
        gap: gap,
        margin,
        backgroundColor,
        padding,
        width,
        height,
        ...style, // Merge any additional styles
      }}
    >
      {children}
    </div>
  );
};

export default Flex;
