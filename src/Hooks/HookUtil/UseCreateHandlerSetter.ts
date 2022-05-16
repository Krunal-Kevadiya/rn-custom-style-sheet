import React, { useCallback, useRef } from 'react';

export default function useCreateHandlerSetter(
  handlerValue: () => void
): [React.MutableRefObject<() => void>, (nextCallback: () => void) => void] {
  const handlerRef: React.MutableRefObject<() => void> = useRef<() => void>(handlerValue);

  const setHandler: (nextCallback: () => void) => void = useCallback(
    (nextCallback: () => void) => {
      handlerRef.current = nextCallback;
    },
    [handlerRef]
  );

  return [handlerRef, setHandler];
}
