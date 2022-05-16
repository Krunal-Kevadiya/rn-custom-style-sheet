import { Appearance } from 'react-native';

import type { AppThemeType } from '../../ThemeReducers';
import type { ThemeType } from '../../Utility';

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
