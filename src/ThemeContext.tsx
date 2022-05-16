import React, { createContext, Dispatch, useReducer } from 'react';

import { useSystemAppearance } from './Hooks';
import type { InitialThemeStateType, ThemeActions } from './ThemeReducers';
import { themeReducer } from './ThemeReducers';

const initialThemeState: InitialThemeStateType = {
  appTheme: 'system',
  systemTheme: 'system',
  orientation: 'portrait'
};

export const ThemeContext = createContext<{
  state: InitialThemeStateType;
  dispatch: Dispatch<ThemeActions>;
}>({
  state: initialThemeState,
  dispatch: () => null
});

export function ThemeProvider({ children }: { children: React.ReactElement }): React.ReactElement {
  const [state, dispatch] = useReducer(themeReducer, initialThemeState);
  useSystemAppearance(dispatch);

  return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>;
}
