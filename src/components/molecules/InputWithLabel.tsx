// src/components/molecules/InputWithLabel.tsx

import React, { forwardRef } from 'react';
import Input from '../atoms/Input';
import Text from '../atoms/Text';

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

// Forward the ref from InputWithLabel to Input
const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, type = 'text', value, onChange, placeholder, required }, ref) => {
    return (
      <>
        <Text size="medium" color="#333">
          {label}
        </Text>
        <Input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      </>
    );
  },
);

InputWithLabel.displayName = 'InputWithLabel';

export default InputWithLabel;
