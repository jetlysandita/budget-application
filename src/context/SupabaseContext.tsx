// src/contexts/SupabaseContext.tsx

import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import {
  getAccumulatedBalance,
  getUserService,
  signInService,
  signUpService,
  User,
} from '@/API/user';
import { useToast } from './ToastContext';
import {
  getMontlyIncomeByYearService,
  upsertMontlyIncomeService,
} from '@/API/user-income';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface MonthlyIncome {
  id: number;
  income: number;
  user_id: string;
  month: number;
  year: number;
}

interface SupabaseContextProps {
  signUp: (name: string, email: string, password: string) => Promise<void>; // No return value, as we set the state directly
  signIn: (email: string, password: string) => Promise<void>;
  getUser: () => Promise<void>;
  getMonthlyIncome: (year: number) => Promise<void>;
  upsertMonthlyIncome: (incomeData: MonthlyIncome) => Promise<void>; // New function for upserting monthly income
  user: User | null;
  status: Status; // Status of the sign-up process
  message: string; // Message for user feedback
  monthlyIncome: MonthlyIncome[];
}

const SupabaseContext = createContext<SupabaseContextProps | undefined>(
  undefined,
);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const toast = useToast();

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [monthlyIncome, setMonthlyIncome] = useState<MonthlyIncome[]>(
    Array(12).fill({ income: 0 }),
  );

  const toastSuccess = (msg: string) => {
    const status = 'success';
    toast.showToast(status, msg);
    setStatus(status);
    setMessage(msg);
  };

  const toastError = (msg: string) => {
    const status = 'error';
    toast.showToast(status, msg);
    setStatus(status);
    setMessage(msg);
  };

  const initService = (callback: () => void) => {
    setStatus('loading'); // Set loading state
    setMessage(''); // Reset message before a new request
    callback();
  };

  const initServiceWithToken = (callback: (token: string) => void) => {
    setStatus('loading'); // Set loading state
    setMessage(''); // Reset message before a new request

    const token = Cookies.get('supabaseToken');

    if (!token) {
      setStatus('error');
      setMessage('No token found');
      return;
    } else {
      callback(token);
    }
  };

  // Register (sign-up) function
  const signUp = async (
    name: string,
    email: string,
    password: string,
  ): Promise<void> => {
    initService(async () => {
      const response = await signUpService(name, email, password);
      if (response.data) {
        toastSuccess('Registration successful!');
      } else {
        toastError(response.error?.msg || 'Sign-up failed');
      }
    });
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    initService(async () => {
      const response = await signInService(email, password);
      if (response.data) {
        toastSuccess('Login successful!');
        const expiryDate = new Date(Date.now() + 3600 * 1000);
        // Save the token in a cookie
        Cookies.set('supabaseToken', response.data.access_token, {
          expires: expiryDate,
        });
        router.push('/');
      } else {
        toastError(response.error?.msg || 'Login failed');
      }
    });
  };

  const getUser = async (): Promise<void> => {
    initServiceWithToken(async (token) => {
      const response = await getUserService(token);
      if (response.data) {
        // Fetch accumulated balance after successfully getting user data
        const currentMonth = new Date().getMonth() + 1; // Current month (1-12)
        const currentYear = new Date().getFullYear(); // Current year

        const accumulatedBalance = await getAccumulatedBalance(
          response.data.id,
          currentMonth.toString(),
          currentYear.toString(),
          token,
        );

        // Update user state with fetched data and accumulated balance
        setUser({
          ...response.data,
          accumulated_balance: accumulatedBalance.data,
        } as User);
      } else {
        toastError(response.error?.msg || 'Failed to fetch user data');
      }
    });
  };

  const getMonthlyIncome = async (year: number): Promise<void> => {
    initServiceWithToken(async (token) => {
      const response = await getMontlyIncomeByYearService(year, token);
      if (response.data) {
        const incomeArray = Array(12).fill({ id: 0, income: 0 }); // [0, 0, ..., 0]

        // Map the fetched data to the corresponding months
        response.data.forEach(
          (item: { income: number; month: number; id: number }) => {
            incomeArray[item.month - 1] = { id: item.id, income: item.income };
          },
        );
        setMonthlyIncome(incomeArray);
      } else {
        toastError(
          response.error?.msg || 'Failed to fetch montly income by yearr',
        );
      }
    });
  };

  // New function to upsert monthly income
  const upsertMonthlyIncome = async (
    incomeData: MonthlyIncome,
  ): Promise<void> => {
    initServiceWithToken(async (token) => {
      const response = await upsertMontlyIncomeService(incomeData, token);
      if (response.error == null) {
        toastSuccess('Monthly income updated successfully!');
        await getMonthlyIncome(new Date().getFullYear()); // Fetch updated income after upsert
        await getUser();
      } else {
        toastError(response.error.msg || 'Failed to upset monthly income');
      }
    });
  };

  return (
    <SupabaseContext.Provider
      value={{
        signUp,
        status,
        message,
        signIn,
        getUser,
        getMonthlyIncome,
        upsertMonthlyIncome,
        user,
        monthlyIncome,
      }}
    >
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
