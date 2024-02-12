import { initialThemeState } from '../Context';
import {
  type InitialThemeStateType,
  type ThemeActions,
  AppThemeModeEnum,
  ReducerEventEnum,
} from './ThemeReducerTypes';

export function themeReducer(
  state: InitialThemeStateType<'aspectRatioFunction'>,
  action: ThemeActions
): InitialThemeStateType<'aspectRatioFunction'> {
  const { type, payload } = action;
  switch (type) {
    case ReducerEventEnum.Initial:
      return Object.assign({}, state, {
        appThemeName: payload.appThemeName,
        appThemeMode: payload.appThemeMode,
        systemThemeMode: payload.systemThemeMode,
        orientation: payload.orientation,
        isSupportedOrientation: payload.isSupportedOrientation,
        isUsedBuiltInAspectRatioFunction:
          payload.isUsedBuiltInAspectRatioFunction,
        withPortraitBehaviorInLandscapeMode:
          payload.withPortraitBehaviorInLandscapeMode,
        deviceForMediaQuery: payload.deviceForMediaQuery,
        guideLineLayout: payload.guideLineLayout,
        guideLineBreakpoint: payload.guideLineBreakpoint,
        screenResolution: payload.screenResolution,
        currentBreakpointIndex: payload.currentBreakpointIndex,
      });
    case ReducerEventEnum.ChangeAppTheme:
      return Object.assign({}, state, {
        appThemeName: payload.appThemeName ?? state.appThemeName,
        appThemeMode: payload.appThemeMode ?? state.appThemeMode,
        systemThemeMode:
          (payload.appThemeMode ?? state.appThemeMode).toLowerCase() !==
          AppThemeModeEnum.System
            ? AppThemeModeEnum.System
            : state.systemThemeMode,
      });
    case ReducerEventEnum.ChangeSystemThemeMode:
      return Object.assign({}, state, {
        systemThemeMode: payload.systemThemeMode,
      });
    case ReducerEventEnum.ChangeResolution:
      return Object.assign({}, state, {
        orientation: payload.orientation,
        screenResolution: payload.screenResolution,
        currentBreakpointIndex: payload.currentBreakpointIndex,
      });
    case ReducerEventEnum.Clear:
      return Object.assign({}, state, initialThemeState);
    default:
      return state;
  }
}
