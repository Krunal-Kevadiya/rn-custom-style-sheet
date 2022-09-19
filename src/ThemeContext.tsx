import React, { createContext, Dispatch, useReducer } from 'react';

import type { BreakpointUnitType, GetStorageStringType, SetStorageStringType } from './Config';
import { useDeviceOrientation, useDidMount, useSystemAppearance } from './Hooks';
import type { MediaQueryAllQueryable } from './MediaQuery';
import type { InitialThemeStateType, ThemeActions } from './ThemeReducers';
import { themeReducer } from './ThemeReducers';
import { applicationOrientation } from './Utility';

const initialThemeState: InitialThemeStateType = {
  appTheme: 'system',
  systemTheme: 'system',
  orientation: 'portrait',
  isRefreshConfig: false,
  isThemeSupportedOrientation: false
};

export const ThemeContext = createContext<{
  state: InitialThemeStateType;
  dispatch: Dispatch<ThemeActions>;
  getStorageString: GetStorageStringType | undefined;
  setStorageString: SetStorageStringType | undefined;
  isMediaQuerySupportedOrientation: boolean;
  deviceForMediaQuery: Partial<MediaQueryAllQueryable> | undefined;
}>({
  state: initialThemeState,
  dispatch: () => null,
  getStorageString: undefined,
  setStorageString: undefined,
  isMediaQuerySupportedOrientation: true,
  deviceForMediaQuery: undefined
});

type ThemeProviderType = {
  children: React.ReactElement;
  isAppLandscape: boolean;
  isThemeSupportedOrientation: boolean;
  isMediaQuerySupportedOrientation: boolean;
  isUsedBuiltInAspectRatioFunction: boolean;
  deviceForMediaQuery?: Partial<MediaQueryAllQueryable>;
  guideLineBaseWidth?: number;
  guideLineBaseHeight?: number;
  guideLineBreakpointValues?: Record<string, number>;
  guideLineBreakpointUnit?: BreakpointUnitType;
  guideLineBreakpointStep?: number;
  guideLineAspectRatioFunction?: (size: number) => number;
  getStorageString: GetStorageStringType;
  setStorageString: SetStorageStringType;
};

export function ThemeProvider({
  children,
  isAppLandscape,
  isThemeSupportedOrientation,
  isMediaQuerySupportedOrientation,
  deviceForMediaQuery,
  guideLineBaseWidth,
  guideLineBaseHeight,
  guideLineBreakpointValues,
  guideLineBreakpointUnit,
  guideLineBreakpointStep,
  isUsedBuiltInAspectRatioFunction,
  guideLineAspectRatioFunction,
  getStorageString,
  setStorageString
}: ThemeProviderType): React.ReactElement {
  const [state, dispatch] = useReducer(themeReducer, initialThemeState);
  useSystemAppearance(dispatch, getStorageString, setStorageString, isThemeSupportedOrientation);
  useDeviceOrientation(dispatch, isThemeSupportedOrientation);

  useDidMount(() => {
    applicationOrientation(dispatch, isAppLandscape, {
      guideLineBaseWidth,
      guideLineBaseHeight,
      guideLineBreakpointValues,
      guideLineBreakpointUnit,
      guideLineBreakpointStep,
      isUsedBuiltInAspectRatioFunction,
      guideLineAspectRatioFunction,
      prevISRefreshConfig: state.isRefreshConfig
    });
  });

  return (
    <ThemeContext.Provider
      value={{
        state,
        dispatch,
        getStorageString,
        setStorageString,
        isMediaQuerySupportedOrientation,
        deviceForMediaQuery
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.defaultProps = {
  isAppLandscape: false,
  isThemeSupportedOrientation: false,
  isMediaQuerySupportedOrientation: true,
  isUsedBuiltInAspectRatioFunction: false
};
