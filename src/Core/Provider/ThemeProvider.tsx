import React, { useEffect, useMemo, useReducer } from 'react';

import {
  breakpointValue,
  getCurrentBreakpointIndex,
  sortBreakpointValues,
} from '../../BreakPoint';
import { getDevice } from '../../MediaQuery';
import { getNewSize } from '../../Scaling';
import {
  type ThemeContextType,
  initialThemeState,
  ThemeContext,
} from '../Context';
import {
  type GetScreenResolutionReturnType,
  getScreenResolution,
  useDeviceOrientation,
  useSystemAppearance,
  getGeneralScreenResolution,
} from '../Hooks';
import {
  AppThemeModeEnum,
  OrientationEnum,
  ReducerEventEnum,
  themeReducer,
  type GeneralScreenResolutionType,
} from '../Reducer';
import type {
  GuideLineLayoutType,
  ThemeProviderType,
} from './ThemeProviderTypes';
import { StorageKeys } from '../../Theming';
import { Dimensions } from 'react-native';
import { UnitEnum } from '../Utils';

export function ThemeProvider({
  children,
  isSupportedOrientation,
  isUsedBuiltInAspectRatioFunction,
  withPortraitBehaviorInLandscapeMode,
  deviceForMediaQuery,
  guideLineLayout,
  guideLineBreakpoint,
  storage,
  appThemeName,
  baseSizeLayout,
}: ThemeProviderType): React.ReactElement {
  const [state, dispatch] = useReducer(themeReducer, initialThemeState);
  useSystemAppearance(dispatch, storage);
  const localGuideLineLayout: GuideLineLayoutType = useMemo(
    () => ({
      width: guideLineLayout?.width ?? 375,
      height: guideLineLayout?.height ?? 812,
    }),
    [guideLineLayout]
  );
  useDeviceOrientation(
    dispatch,
    isSupportedOrientation,
    guideLineBreakpoint?.values ?? breakpointValue,
    withPortraitBehaviorInLandscapeMode,
    localGuideLineLayout,
    baseSizeLayout
  );

  useEffect(() => {
    const localAppThemeName: string = storage.getStorage(
      StorageKeys.AppThemeNameKey,
      ''
    );
    const localAppThemeMode: AppThemeModeEnum = storage.getStorage(
      StorageKeys.AppThemeModeKey,
      AppThemeModeEnum.System
    ) as AppThemeModeEnum;
    const localSystemThemeMode: AppThemeModeEnum = storage.getStorage(
      StorageKeys.SystemThemeModeKey,
      AppThemeModeEnum.System
    ) as AppThemeModeEnum;
    const screenInitConfig: GetScreenResolutionReturnType = getScreenResolution(
      Dimensions.get('window'),
      withPortraitBehaviorInLandscapeMode
    );
    const generalScreenInitConfig: GeneralScreenResolutionType =
      getGeneralScreenResolution(
        screenInitConfig.screenResolution,
        localGuideLineLayout,
        baseSizeLayout
      );

    // Trigger first time only
    if (localAppThemeName !== appThemeName && localAppThemeName.length <= 0) {
      storage.setStorage(StorageKeys.AppThemeNameKey, appThemeName);
    }

    dispatch({
      type: ReducerEventEnum.Initial,
      payload: {
        isSupportedOrientation,
        isUsedBuiltInAspectRatioFunction,
        withPortraitBehaviorInLandscapeMode,
        deviceForMediaQuery: getDevice(undefined, deviceForMediaQuery),
        guideLineLayout: localGuideLineLayout,
        guideLineBreakpoint: {
          values: guideLineBreakpoint?.values ?? breakpointValue,
          unit: guideLineBreakpoint?.unit ?? UnitEnum.Px,
          step: guideLineBreakpoint?.step ?? 0,
          keys: Object.keys(
            sortBreakpointValues(guideLineBreakpoint?.values ?? breakpointValue)
          ),
        },
        appThemeName: localAppThemeName || appThemeName,
        appThemeMode: localAppThemeMode,
        systemThemeMode: localSystemThemeMode,
        currentBreakpointIndex: getCurrentBreakpointIndex(
          guideLineBreakpoint?.values ?? breakpointValue,
          screenInitConfig.screenResolution.windowWidth
        ),
        orientation: isSupportedOrientation
          ? screenInitConfig.orientation
          : OrientationEnum.Portrait,
        screenResolution: screenInitConfig.screenResolution,
        generalScreenResolution: generalScreenInitConfig,
      },
    });
  }, [
    deviceForMediaQuery,
    guideLineBreakpoint,
    localGuideLineLayout,
    isSupportedOrientation,
    isUsedBuiltInAspectRatioFunction,
    withPortraitBehaviorInLandscapeMode,
    storage,
    appThemeName,
    baseSizeLayout,
  ]);

  const value: ThemeContextType = useMemo(() => {
    return {
      state: {
        ...state,
        guideLineLayout: {
          ...state.guideLineLayout,
          aspectRatioFunction:
            guideLineLayout?.aspectRatioFunction ??
            (state.isUsedBuiltInAspectRatioFunction
              ? getNewSize(state.screenResolution)
              : (size: number) => size),
        },
      },
      dispatch,
      storage,
    };
  }, [state, storage, guideLineLayout?.aspectRatioFunction]);

  if (
    (appThemeName?.length ?? 0) > 0 &&
    (state.appThemeName?.length ?? 0) <= 0
  ) {
    return <></>;
  }
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

ThemeProvider.defaultProps = {
  appThemeName: '',
  isSupportedOrientation: false,
  isUsedBuiltInAspectRatioFunction: false,
  withPortraitBehaviorInLandscapeMode: false,
};
