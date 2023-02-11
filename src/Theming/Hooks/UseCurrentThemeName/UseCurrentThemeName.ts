import type { ThemeContextType } from '../../../Core';
import { useThemeContext } from '../../../Core';

export default function useCurrentThemeName(): string {
  const {
    state: { appThemeName },
  }: ThemeContextType = useThemeContext();
  return appThemeName;
}
