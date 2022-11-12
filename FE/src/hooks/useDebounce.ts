import { useState, useEffect } from 'react';

export default function UseDebounce(value: string, time = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);

  return debouncedValue;
}
