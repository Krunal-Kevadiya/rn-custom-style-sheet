import React, { createContext, Dispatch, useReducer } from 'react';

import { useDeviceOrientation, useSystemAppearance } from './Hooks';
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

export function ThemeProvider({
  children,
  isSupportLandscape
}: {
  children: React.ReactElement;
  isSupportLandscape: boolean;
}): React.ReactElement {
  const [state, dispatch] = useReducer(themeReducer, initialThemeState);
  useSystemAppearance(dispatch);
  useDeviceOrientation(dispatch, isSupportLandscape);

  return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>;
}

ThemeProvider.defaultProps = {
  isSupportLandscape: false
};
