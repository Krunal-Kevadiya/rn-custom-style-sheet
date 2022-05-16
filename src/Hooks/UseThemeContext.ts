import type { Dispatch } from 'react';
import { useContext } from 'react';

import { ThemeContext } from '../ThemeContext';
import type { InitialThemeStateType, ThemeActions } from '../ThemeReducers';

export default function useThemeContext(): {
  state: InitialThemeStateType;
  dispatch: Dispatch<ThemeActions>;
} {
  return useContext(ThemeContext);
}
