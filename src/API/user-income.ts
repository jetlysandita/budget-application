import fetchData, { ApiError } from '@/utility/api';

interface Income {
  income: number;
  month: number;
  id: number;
}

interface MonthlyIncome {
  id: number;
  income: number;
  user_id: string;
  month: number;
  year: number;
}

const headers = {
  'Content-Type': 'application/json',
};

export const getMontlyIncomeByYearService = async (
  year: number,
  accessToken: string,
): Promise<{ data: Income[] | null; error: ApiError | null }> => {
  return await fetchData<Income[]>(
    `/rest/v1/monthly_income?year=eq.${year}`,
    'GET',
    {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  );
};

export const upsertMontlyIncomeService = async (
  param: MonthlyIncome,
  accessToken: string,
): Promise<{ data: null; error: ApiError | null }> => {
  return await fetchData(
    `/rest/v1/monthly_income`,
    'POST',
    {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
      Prefer: 'resolution=merge-duplicates',
    },
    { ...param },
  );
};
