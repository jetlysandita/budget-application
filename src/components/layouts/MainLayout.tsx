import React from 'react';
import styles from '@/styles/layouts/MobileLayout.module.scss';

interface MobileLayoutProps {
  children?: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => (
  <div className={styles.mobileLayout}>{children}</div>
);

export default MobileLayout;
