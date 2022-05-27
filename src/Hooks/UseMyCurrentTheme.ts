import type { ThemeType } from '../Utility';
import { getCurrentTheme } from './HookUtil';
import useThemeContext from './UseThemeContext';

export default function useMyCurrentTheme(): ThemeType {
  const {
    state: { appTheme, systemTheme }
  } = useThemeContext();
  const themeType: ThemeType = getCurrentTheme(appTheme, systemTheme);
  return themeType;
}
