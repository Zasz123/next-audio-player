import { useState } from 'react';

export default function useBoolean(initialState?: boolean) {
  const [value, setValue] = useState(initialState ?? false);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [value, setValue, setTrue, setFalse] as const;
}
