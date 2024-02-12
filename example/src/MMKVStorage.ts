import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const isNullOrUndefined = (value: any) => value === null || value === undefined;

export function getStorageString<T>(key: string, defaultValue: T): T {
  const value = storage.getString(key);
  if (isNullOrUndefined(value)) {
    return defaultValue;
  } else if (typeof value === 'boolean') {
    return Boolean(value) as T;
  } else if (typeof value === 'string') {
    return String(value) as T;
  } else if (typeof value === 'number') {
    return Number(value) as T;
  }
  return JSON.parse(value ?? '{}');
}

export function setStorageString<T>(key: string, newValue: T): void {
  let value: boolean | string | number;
  if (
    typeof newValue === 'boolean' ||
    typeof newValue === 'string' ||
    typeof newValue === 'number'
  ) {
    value = newValue;
  } else {
    value = JSON.stringify(newValue);
  }
  storage.set(key, value);
}
