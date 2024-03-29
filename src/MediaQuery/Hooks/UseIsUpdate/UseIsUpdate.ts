import { useEffect, useRef } from 'react';

export default function useIsUpdate(): boolean {
  const ref: React.MutableRefObject<boolean> = useRef<boolean>(false);

  useEffect(() => {
    ref.current = true;
  }, []);

  return ref.current;
}
