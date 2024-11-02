// src/pages/Register.tsx

import React, { useRef } from 'react';
import InputWithLabel from '../molecules/InputWithLabel';
import Flex from '../atoms/Flex';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { useToast } from '@/context/ToastContext';
import { useSupabase } from '@/context/SupabaseContext';

const FormRegister: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const supabase = useSupabase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // Basic validation
    if (!name || !password) {
      toast.showToast('error', 'Name and password cannot be empty.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      toast.showToast('error', 'Please enter a valid email address.');
      return;
    }

    // If validation passes
    supabase.signUp(name, email, password);

    // Reset form fields
    if (nameRef.current) nameRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';
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
          Sign Up
        </Text>
        <InputWithLabel
          ref={nameRef}
          required
          label="Name"
          placeholder="Enter your name"
        />
        <InputWithLabel
          ref={emailRef}
          required
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        <InputWithLabel
          ref={passwordRef}
          required
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <Button isLoading={supabase.status === 'loading'}>Sign Up</Button>
      </Flex>
    </form>
  );
};

export default FormRegister;
