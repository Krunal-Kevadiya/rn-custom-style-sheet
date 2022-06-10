import { useEffect, useRef } from 'react';

export default function useIsUpdate(): boolean {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = true;
  }, []);

  return ref.current;
}
