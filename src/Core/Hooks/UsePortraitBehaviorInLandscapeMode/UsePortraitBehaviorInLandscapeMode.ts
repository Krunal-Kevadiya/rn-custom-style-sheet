import type { ThemeContextType } from '../../Context';
import { useThemeContext } from '../UseThemeContext';

export default function usePortraitBehaviorInLandscapeMode(): boolean {
  const {
    state: { withPortraitBehaviorInLandscapeMode },
  }: ThemeContextType = useThemeContext();
  return withPortraitBehaviorInLandscapeMode;
}
