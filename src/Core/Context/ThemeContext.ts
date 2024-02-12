import { createContext } from 'react';
import { type ScaledSize, Dimensions, Platform } from 'react-native';

import { breakpointValue, sortBreakpointValues } from '../../BreakPoint';
import {
  type InitialThemeStateType,
  AppThemeModeEnum,
  OrientationEnum,
} from '../Reducer';
import type { ThemeContextType } from './ThemeContextTypes';
import { UnitEnum } from '../Utils';

const window: ScaledSize = Dimensions.get('window');

export const initialThemeState: InitialThemeStateType<'aspectRatioFunction'> = {
  appThemeName: '',
  appThemeMode: AppThemeModeEnum.System,
  systemThemeMode: AppThemeModeEnum.System,
  orientation: OrientationEnum.Portrait,
  isSupportedOrientation: false,
  isUsedBuiltInAspectRatioFunction: false,
  withPortraitBehaviorInLandscapeMode: false,
  deviceForMediaQuery: undefined,
  screenResolution: {
    windowWidth: window.width,
    windowHeight: window.height,
    shortDimension: Math.min(window.width, window.height),
    longDimension: Math.max(window.width, window.height),
  },
  guideLineLayout: { width: 375, height: 812 },
  guideLineBreakpoint: {
    values: breakpointValue,
    unit: UnitEnum.Px,
    step: 0,
    keys: Object.keys(sortBreakpointValues(breakpointValue)),
  },
  currentBreakpointIndex: -1,
  generalScreenResolution: {
    baseWidth: Math.min(window.width, window.height) / 375,
    baseHeight: Math.max(window.width, window.height) / 812,
    baseSizeRatio:
      (Math.min(window.width, window.height) / 375 +
        Math.max(window.width, window.height) / 812) /
      2,
    isTablet:
      (Platform.OS === 'ios' && Platform.isPad) ||
      (Math.min(window.width, window.height) / 375 +
        Math.max(window.width, window.height) / 812) /
        2 >
        1.2,
    threshold:
      (Platform.OS === 'ios' && Platform.isPad) ||
      (Math.min(window.width, window.height) / 375 +
        Math.max(window.width, window.height) / 812) /
        2 >
        1.2
        ? 0.4
        : 0.5,
    baseSizeWithThreshold:
      (Math.min(window.width, window.height) / 375 +
        Math.max(window.width, window.height) / 812) *
      ((Platform.OS === 'ios' && Platform.isPad) ||
      (Math.min(window.width, window.height) / 375 +
        Math.max(window.width, window.height) / 812) /
        2 >
        1.2
        ? 0.4
        : 0.5),
  },
};

export const ThemeContext = createContext<ThemeContextType>({
  state: initialThemeState,
  dispatch: () => null,
  storage: undefined,
});
