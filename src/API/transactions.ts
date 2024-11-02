import fetchData, { ApiError } from '@/utility/api';
import { filterJson } from '@/utility/helpers';

const headers = {
  'Content-Type': 'application/json',
};

export interface Transactions {
  transaction_id: number;
  user_id: string;
  transaction_date: string;
  amount: number;
  note: string;
  tag: string;
  tag_id: number;
  transaction_date_plain: string;
}

interface GetTransactions {
  p_page: number;
  p_page_size: number;
}

export interface UpsertTransaction {
  id?: number | null;
  amount?: number;
  transaction_date?: string;
  tag_id?: number;
  note?: string;
  user_id?: string;
}

export const getTransactionsService = async (
  param: GetTransactions,
  accessToken: string,
): Promise<{ data: Transactions[] | null; error: ApiError | null }> => {
  return await fetchData<Transactions[]>(
    `/rest/v1/rpc/get_transactions_by_user_id`,
    'POST',
    {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
    { ...param },
  );
};

export const upsertTransactionsService = async (
  param: UpsertTransaction,
  accessToken: string,
): Promise<{ data: null; error: ApiError | null }> => {
  return await fetchData(
    `/rest/v1/transactions`,
    'POST',
    {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
      Prefer: 'resolution=merge-duplicates',
    },
    { ...filterJson(param) },
  );
};
