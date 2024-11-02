/**
 * Format a number as Indonesian Rupiah.
 * @param amount - The amount to format.
 * @returns The formatted Rupiah string.
 */
export const formatRupiah = (amount: number): string => {
  return `RP ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

/**
 * Censor sensitive data based on a flag.
 * @param data - The string to check.
 * @param shouldCensor - Boolean flag to indicate if the data should be censored.
 * @returns The original or censored string.
 */
export const censorSensitiveData = (
  data: string,
  shouldCensor: boolean,
): string => {
  return shouldCensor ? '*****' : data;
};
