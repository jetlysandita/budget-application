// src/contexts/SupabaseContext.tsx

import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

type Status = 'idle' | 'loading' | 'success' | 'error';
interface SupabaseContextProps {
  signUp: (
    name: string,
    email: string,
    password: string,
    callback: (status: Status, message: string) => void,
  ) => Promise<void>; // No return value, as we set the state directly
  signIn: (email: string, password: string) => Promise<void>;
  status: Status; // Status of the sign-up process
  message: string; // Message for user feedback
}

const SupabaseContext = createContext<SupabaseContextProps | undefined>(
  undefined,
);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_API_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

  const router = useRouter();

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState<string>('');

  // Register (sign-up) function
  const signUp = async (
    name: string,
    email: string,
    password: string,
    callback: (status: Status, message: string) => void,
  ): Promise<void> => {
    setStatus('loading'); // Set loading state
    setMessage(''); // Reset message before a new request

    const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apiKey: SUPABASE_API_KEY!,
      },
      body: JSON.stringify({ email, password, data: { name } }),
    });

    const data = await response.json();

    if (response.ok) {
      const message = 'Registration successful!';
      const status = 'success';
      setStatus(status);
      setMessage(message);
      callback(status, message); // Set success message
    } else {
      const message = data?.msg || 'Sign-up failed';
      const status = 'error';
      setStatus(status);
      setMessage(message); // Set error message
      callback(status, message);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    setStatus('loading');
    setMessage('');

    const response = await fetch(
      `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apiKey: SUPABASE_API_KEY!,
        },
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      setStatus('success');
      setMessage('Login successful!');

      const expiryDate = new Date(Date.now() + 3600 * 1000);
      // Save the token in a cookie
      Cookies.set('supabaseToken', data.access_token, { expires: expiryDate });
      router.push('/');
    } else {
      setStatus('error');
      setMessage(data.error?.message || 'Login failed');
    }
  };

  return (
    <SupabaseContext.Provider value={{ signUp, status, message, signIn }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
