const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_API_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

// Define Error interface for expected error response format
export interface ApiError {
  code: number;
  msg: string;
  error_code: string;
}

// Helper function to build query strings from an object
const buildQueryString = (
  params: Record<string, string | number | boolean>,
) => {
  return new URLSearchParams(params as Record<string, string>).toString();
};

// Reusable fetch function
const fetchData = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  headers: Record<string, string> = {},
  body?: Record<string, unknown> | null,
  queryParams?: Record<string, string | number | boolean>, // New parameter for query parameters
): Promise<{ data: T | null; error: ApiError | null }> => {
  try {
    // Append query parameters to URL if they exist
    const queryString = queryParams ? `?${buildQueryString(queryParams)}` : '';
    const fullUrl = `${SUPABASE_URL}${url}${queryString}`;

    const response = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_API_KEY!,
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    // Check if response is not ok and handle error parsing
    if (!response.ok) {
      const errorData = await response.json();
      return {
        data: null,
        error: {
          code: errorData.code || response.status,
          msg: errorData.msg || 'Request failed',
          error_code: errorData.error_code || 'UNKNOWN_ERROR',
        },
      };
    }

    let data: T | null = null;
    try {
      data = await response.json();
    } catch {
      // If parsing fails, assume response body is empty or locked
      data = null;
    }

    return { data, error: null };
  } catch (err) {
    console.error('Fetch error:', err);
    return {
      data: null,
      error: {
        code: 500,
        msg: 'Network error',
        error_code: 'NETWORK_ERROR',
      },
    };
  }
};

export default fetchData;
