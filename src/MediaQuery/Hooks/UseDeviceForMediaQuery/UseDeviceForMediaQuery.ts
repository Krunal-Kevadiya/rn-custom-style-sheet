import { type ThemeContextType, useThemeContext } from '../../../Core';
import type { MediaQueryAllQueryable } from '../../Components';

export default function useDeviceForMediaQuery():
  | Partial<MediaQueryAllQueryable>
  | undefined {
  const {
    state: { deviceForMediaQuery },
  }: ThemeContextType = useThemeContext();
  return deviceForMediaQuery;
}
