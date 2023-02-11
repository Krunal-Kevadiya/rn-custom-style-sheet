import type { ThemeContextType, ThemeModeEnum } from '../../../Core';
import { useThemeContext } from '../../../Core';
import { getCurrentThemeMode } from './UseCurrentThemeModeUtils';

export default function useCurrentThemeMode(): ThemeModeEnum {
  const {
    state: { appThemeMode, systemThemeMode },
  }: ThemeContextType = useThemeContext();
  const themeType: ThemeModeEnum = getCurrentThemeMode(
    appThemeMode,
    systemThemeMode
  );
  return themeType;
}
