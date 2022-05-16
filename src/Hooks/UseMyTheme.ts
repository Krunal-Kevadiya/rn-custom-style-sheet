import { useMemo } from 'react';

import type { ThemeType } from '../Utility';
import { getCurrentTheme } from './HookUtil';
import useThemeContext from './UseThemeContext';

export default function useMyTheme<T>(styleSheetFn: (type: ThemeType) => T): T {
  const {
    state: { appTheme, systemTheme }
  } = useThemeContext();
  const themeType: ThemeType = getCurrentTheme(appTheme, systemTheme);

  const styles: T = useMemo<T>(() => styleSheetFn(themeType), [styleSheetFn, themeType]);
  return styles;
}
