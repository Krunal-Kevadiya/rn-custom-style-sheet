import type { Dispatch } from 'react';
import { useContext } from 'react';

import type { MediaQueryAllQueryable } from '../MediaQuery';
import { ThemeContext } from '../ThemeContext';
import type { InitialThemeStateType, ThemeActions } from '../ThemeReducers';

export default function useThemeContext(): {
  state: InitialThemeStateType;
  dispatch: Dispatch<ThemeActions>;
  isMediaQuerySupportedOrientation: boolean;
  deviceForMediaQuery: Partial<MediaQueryAllQueryable> | undefined;
} {
  return useContext(ThemeContext);
}
