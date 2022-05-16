import { useState } from 'react';

import type { StorageStringType } from '../Utility';
import { getStorageString, setStorageString } from '../Utility';
import useDidMount from './UseDidMount';

export default function useAsyncStorage<T extends StorageStringType>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void, boolean] {
  const [state, setState] = useState({
    hydrated: false,
    storageValue: defaultValue
  });
  const { hydrated, storageValue } = state;

  function pullFromStorage() {
    const fromStorage = getStorageString<T>(key, defaultValue);
    setState({ hydrated: true, storageValue: fromStorage });
  }

  function updateStorage(newValue: T) {
    setState({ hydrated: true, storageValue: newValue });
    setStorageString<T>(key, newValue);
  }

  useDidMount(() => {
    pullFromStorage();
  }, []);

  return [storageValue, updateStorage, hydrated];
}
