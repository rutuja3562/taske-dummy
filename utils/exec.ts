//-----------------------------------------------------------------------------------------------------------
// File: src/utils/exec.ts
//-----------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------

/**
 * Promise which resolves after the specified delay (seconds)
 * @param seconds Required delay
 * @returns Promise
 * @example
 * await delayFor(5);
 * console.log("This will print after 5 seconds");
 */
export const delayFor = (seconds: number = 5): Promise<void> =>
  new Promise((resolve) => {
    let timerId = setTimeout(() => {
      clearTimeout(timerId);
      resolve();
    }, seconds * 1000);
  });

//---------------------------------------------------------------------------------

/**
 * Execute the specified function after the given delay (seconds).
 * @param seconds Required delay
 * @param fn Function to be executed after the delay
 * @example
 * afterDelayOf(5, () => console.log("5 seconds have elapsed!"));
 */
export const afterDelayOf = async (
  seconds: number,
  fn: () => any,
): Promise<void> => {
  await delayFor(seconds);
  fn();
};

//---------------------------------------------------------------------------------

// Debounce function to limit the rate of function execution
export const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

//---------------------------------------------------------------------------------
