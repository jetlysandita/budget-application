import React from 'react';
import styles from '@/styles/atoms/Select.module.scss';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string; // Optional additional className for styling
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={`${styles['select-container']} ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${styles['select-element']}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
