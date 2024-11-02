import fetchData, { ApiError } from '@/utility/api';

interface IdentityData {
  email: string;
  email_verified: boolean;
  name: string;
  phone_verified: boolean;
  sub: string;
}

interface Identity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: IdentityData;
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
}

interface AppMetadata {
  provider: string;
  providers: string[];
}

interface UserMetadata {
  email: string;
  email_verified: boolean;
  name: string;
  phone_verified: boolean;
  sub: string;
}

export interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: Identity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
  accumulated_balance?: number;
}

interface AuthResponse {
  access_token: string;
  user: User;
}

const headers = {
  'Content-Type': 'application/json',
};

// Sign up a new user
export const signUpService = async (
  name: string,
  email: string,
  password: string,
): Promise<{ data: User | null; error: ApiError | null }> => {
  return await fetchData<User>('/auth/v1/signup', 'POST', headers, {
    email,
    password,
    data: { name },
  });
};

// Sign in an existing user
export const signInService = async (
  email: string,
  password: string,
): Promise<{ data: AuthResponse | null; error: ApiError | null }> => {
  return await fetchData<AuthResponse>(
    '/auth/v1/token?grant_type=password',
    'POST',
    headers,
    {
      email,
      password,
    },
  );
};

// Get user details by access token
export const getUserService = async (
  accessToken: string,
): Promise<{ data: User | null; error: ApiError | null }> => {
  return await fetchData<User>('/auth/v1/user', 'GET', {
    ...headers,
    Authorization: `Bearer ${accessToken}`,
  });
};

export const getAccumulatedBalance = async (
  userId: string,
  currentMonth: string,
  currentYear: string,
  accessToken: string,
): Promise<{ data: number | null; error: ApiError | null }> => {
  return await fetchData<number>(
    '/rest/v1/rpc/calculate_accumulated_balance',
    'GET',
    {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
    null,
    {
      p_current_month: currentMonth,
      p_current_year: currentYear,
      p_user_id: userId,
    },
  );
};
