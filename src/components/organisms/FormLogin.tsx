// src/pages/Register.tsx

import React, { useRef } from 'react';
import InputWithLabel from '../molecules/InputWithLabel';
import Flex from '../atoms/Flex';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { useSupabase } from '@/context/SupabaseContext';
import { useToast } from '@/context/ToastContext';

const FormLogin: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const supabase = useSupabase();
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // Basic validation
    if (!password) {
      toast.showToast('error', 'Name and password cannot be empty.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      toast.showToast('error', 'Please enter a valid email address.');
      return;
    }

    supabase.signIn(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        direction="column"
        backgroundColor="#F4F5F7"
        margin="37px 0 0 0"
        padding="34px 16px"
        gap="16px"
      >
        <Text width="100%" textAlign="center">
          Sign In
        </Text>
        <InputWithLabel
          label="Email"
          ref={emailRef}
          placeholder="Enter your email"
        />
        <InputWithLabel
          label="Password"
          type="password"
          ref={passwordRef}
          placeholder="Enter your password"
        />
        <Button>Sign In</Button>
      </Flex>
    </form>
  );
};

export default FormLogin;
