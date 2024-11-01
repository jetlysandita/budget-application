// src/layouts/MobileLayout.tsx
import React, { ReactNode } from 'react';
import styles from '@/styles/layouts/MobileLayout.module.scss'; // Import your styles

interface MobileLayoutProps {
  children?: ReactNode; // Define the type for children
  backgroundColor?: string; // Optional background color prop
  backgroundImage?: string;
  footer?: ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  backgroundColor = '#fff',
  backgroundImage,
  footer,
}) => {
  return (
    <div
      className={styles.container}
      style={{ backgroundColor, backgroundImage }}
    >
      {children}
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </div>
  );
};

export default MobileLayout;
