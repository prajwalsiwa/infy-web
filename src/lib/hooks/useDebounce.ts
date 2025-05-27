import { useEffect, useState } from "react";

export const useDebounce = <T>(val: T) => {
  const [deboucedValue, setDebouncedValue] = useState<T>(val);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(val);
    }, 500);

    return () => clearTimeout(timeout);
  }, [val]);

  return deboucedValue;
};
