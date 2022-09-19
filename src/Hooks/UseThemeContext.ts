import type { Dispatch } from 'react';
import { useContext } from 'react';

import type { GetStorageStringType, SetStorageStringType } from '../Config';
import type { MediaQueryAllQueryable } from '../MediaQuery';
import { ThemeContext } from '../ThemeContext';
import type { InitialThemeStateType, ThemeActions } from '../ThemeReducers';

export default function useThemeContext(): {
  state: InitialThemeStateType;
  dispatch: Dispatch<ThemeActions>;
  getStorageString: GetStorageStringType | undefined;
  setStorageString: SetStorageStringType | undefined;
  isMediaQuerySupportedOrientation: boolean;
  deviceForMediaQuery: Partial<MediaQueryAllQueryable> | undefined;
} {
  return useContext(ThemeContext);
}
