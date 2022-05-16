import React, { createContext, Dispatch, useContext, useReducer } from 'react';

import type { InitialThemeStateType, ThemeActions } from './ThemeReducers';
import { themeReducer } from './ThemeReducers';
import useSystemAppearance from './UseSystemAppearance';

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

export function useThemeContext(): {
  state: InitialThemeStateType;
  dispatch: Dispatch<ThemeActions>;
} {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactElement }): React.ReactElement {
  const [state, dispatch] = useReducer(themeReducer, initialThemeState);
  useSystemAppearance(dispatch);

  return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>;
}
