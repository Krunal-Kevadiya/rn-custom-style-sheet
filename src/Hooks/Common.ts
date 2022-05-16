import { Appearance } from 'react-native';

import type { ThemeType } from '../Utility';
import type { AppThemeType } from './ThemeReducers';

export function getCurrentTheme(appTheme: AppThemeType, systemTheme: AppThemeType): ThemeType {
  if (appTheme === 'system') {
    if (systemTheme === 'system') {
      return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
    } else {
      return systemTheme;
    }
  } else {
    return appTheme;
  }
}
