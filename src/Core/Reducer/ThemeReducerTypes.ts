import type { MediaQueryAllQueryable } from '../../MediaQuery';
import type { GuideLineBreakpointType, GuideLineLayoutType } from '../Provider';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum ThemeModeEnum {
  Light = 'light',
  Dark = 'dark',
}
export enum AppThemeModeEnum {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}
export enum OrientationEnum {
  Portrait = 'portrait',
  Landscape = 'landscape',
}
export enum ReducerEventEnum {
  Initial = 'INITIAL',
  ChangeAppTheme = 'CHANGE_APP_THEME',
  ChangeSystemThemeMode = 'CHANGE_SYSTEM_THEME_MODE',
  ChangeResolution = 'CHANGE_RESOLUTIONS',
  Clear = 'CLEAR',
}

export type StateGuideLineBreakpointType = GuideLineBreakpointType & {
  keys: string[];
};

export type ScreenResolutionType = {
  windowWidth: number;
  windowHeight: number;
  shortDimension: number;
  longDimension: number;
};

export type GeneralScreenResolutionType = {
  baseWidth: number;
  baseHeight: number;
  isTablet: boolean;
  baseSizeRatio: number;
  threshold: number;
  baseSizeWithThreshold: number;
};

export type InitialThemeStateType<T extends string> = {
  appThemeName: string;
  appThemeMode: AppThemeModeEnum;
  systemThemeMode: AppThemeModeEnum;
  orientation: OrientationEnum;
  isSupportedOrientation: boolean;
  isUsedBuiltInAspectRatioFunction: boolean;
  withPortraitBehaviorInLandscapeMode: boolean;
  deviceForMediaQuery?: Partial<MediaQueryAllQueryable>;
  guideLineLayout: Omit<GuideLineLayoutType, T>;
  guideLineBreakpoint: StateGuideLineBreakpointType;
  screenResolution: ScreenResolutionType;
  currentBreakpointIndex: number;
  generalScreenResolution: GeneralScreenResolutionType;
};

type ThemePayload = {
  [ReducerEventEnum.Initial]: {
    appThemeName: string;
    appThemeMode: AppThemeModeEnum;
    systemThemeMode: AppThemeModeEnum;
    orientation: OrientationEnum;
    isSupportedOrientation: boolean;
    isUsedBuiltInAspectRatioFunction: boolean;
    withPortraitBehaviorInLandscapeMode: boolean;
    deviceForMediaQuery: Partial<MediaQueryAllQueryable>;
    guideLineLayout: Omit<GuideLineLayoutType, 'aspectRatioFunction'>;
    guideLineBreakpoint: StateGuideLineBreakpointType;
    screenResolution: ScreenResolutionType;
    currentBreakpointIndex: number;
    generalScreenResolution: GeneralScreenResolutionType;
  };
  [ReducerEventEnum.ChangeAppTheme]: {
    appThemeName?: string;
    appThemeMode?: AppThemeModeEnum;
  };
  [ReducerEventEnum.ChangeSystemThemeMode]: {
    appThemeMode?: AppThemeModeEnum;
    systemThemeMode: AppThemeModeEnum;
  };
  [ReducerEventEnum.ChangeResolution]: {
    currentBreakpointIndex: number;
    orientation: OrientationEnum;
    screenResolution: ScreenResolutionType;
    generalScreenResolution: GeneralScreenResolutionType;
  };
  [ReducerEventEnum.Clear]: {};
};

export type ThemeActions =
  ActionMap<ThemePayload>[keyof ActionMap<ThemePayload>];
