import React, { createContext, Dispatch, useReducer } from 'react';

import { useDeviceOrientation, useSystemAppearance } from './Hooks';
import useDidMount from './Hooks/UseDidMount';
import type { InitialThemeStateType, ThemeActions } from './ThemeReducers';
import { themeReducer } from './ThemeReducers';
import { applicationOrientation } from './Utility';

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
  isSupportLandscape,
  isAppLandscape
}: {
  children: React.ReactElement;
  isSupportLandscape: boolean;
  isAppLandscape: boolean;
}): React.ReactElement {
  const [state, dispatch] = useReducer(themeReducer, initialThemeState);
  useSystemAppearance(dispatch);
  useDeviceOrientation(dispatch, isSupportLandscape);

  useDidMount(() => {
    applicationOrientation(dispatch, isAppLandscape);
  });

  return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>;
}

ThemeProvider.defaultProps = {
  isSupportLandscape: false,
  isAppLandscape: false
};
