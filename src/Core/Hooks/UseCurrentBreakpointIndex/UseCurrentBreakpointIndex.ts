import type { ThemeContextType } from '../../Context';
import { useThemeContext } from '../UseThemeContext';

export default function useCurrentBreakpointIndex(): number {
  const {
    state: { currentBreakpointIndex },
  }: ThemeContextType = useThemeContext();
  return currentBreakpointIndex;
}
