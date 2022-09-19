import { useState } from 'react';

import type { GetStorageStringType, SetStorageStringType } from '../Config';
import useDidMount from './UseDidMount';

export default function useAsyncStorage(
  key: string,
  defaultValue: string,
  getStorageString?: GetStorageStringType,
  setStorageString?: SetStorageStringType
): [string, (newValue: string) => void, boolean] {
  const [state, setState] = useState({
    hydrated: false,
    storageValue: defaultValue
  });
  const { hydrated, storageValue } = state;

  function pullFromStorage() {
    const fromStorage = getStorageString!(key, defaultValue);
    setState({ hydrated: true, storageValue: fromStorage });
  }

  function updateStorage(newValue: string) {
    setState({ hydrated: true, storageValue: newValue });
    setStorageString!(key, newValue);
  }

  useDidMount(() => {
    pullFromStorage();
  }, []);

  return [storageValue, updateStorage, hydrated];
}
