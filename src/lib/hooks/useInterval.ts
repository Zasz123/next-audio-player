import { useEffect, useRef } from 'react';

export default function useInterval(
  callback: () => void,
  delay: number | null,
) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => {
        if (savedCallback.current !== undefined) {
          savedCallback.current();
        }
      }, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
