import type { ThemeContextType } from '../../Context';
import type { ScreenResolutionType } from '../../Reducer';
import { useThemeContext } from '../UseThemeContext';

export default function useScreenResolution(): ScreenResolutionType {
  const {
    state: { screenResolution },
  }: ThemeContextType = useThemeContext();
  return screenResolution;
}
