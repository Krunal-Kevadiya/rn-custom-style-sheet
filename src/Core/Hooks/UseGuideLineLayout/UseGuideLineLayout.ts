import type { ThemeContextType } from '../../Context';
import type { GuideLineLayoutType } from '../../Provider';
import { useThemeContext } from '../UseThemeContext';

export default function useGuideLineLayout(): Omit<GuideLineLayoutType, ''> {
  const {
    state: { guideLineLayout },
  }: ThemeContextType = useThemeContext();
  return guideLineLayout;
}
