type Func<T extends readonly unknown[]> = (...args: T) => void;

export const debounce = <T extends readonly unknown[]>(
  func: Func<T>,
  wait: number
) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
