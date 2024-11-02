// src/utility/debounce.ts

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends any[]>(
  func: (...args: T) => void,
  delay: number,
) {
  let timeoutId: NodeJS.Timeout;

  return (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
