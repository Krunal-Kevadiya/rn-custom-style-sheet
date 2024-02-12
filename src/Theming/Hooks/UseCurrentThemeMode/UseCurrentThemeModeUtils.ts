import { Appearance } from 'react-native';

import { AppThemeModeEnum, ThemeModeEnum } from '../../../Core';

export function getCurrentThemeMode(
  appThemeMode: AppThemeModeEnum,
  systemThemeMode: AppThemeModeEnum
): ThemeModeEnum {
  if (appThemeMode === AppThemeModeEnum.System) {
    if (systemThemeMode === AppThemeModeEnum.System) {
      return Appearance.getColorScheme() === AppThemeModeEnum.Dark
        ? ThemeModeEnum.Dark
        : ThemeModeEnum.Light;
    } else {
      return systemThemeMode === AppThemeModeEnum.Dark
        ? ThemeModeEnum.Dark
        : ThemeModeEnum.Light;
    }
  } else {
    return appThemeMode === AppThemeModeEnum.Dark
      ? ThemeModeEnum.Dark
      : ThemeModeEnum.Light;
  }
}
