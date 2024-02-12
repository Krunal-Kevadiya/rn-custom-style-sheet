import type { ThemeContextType } from '../../Context';
import type { StateGuideLineBreakpointType } from '../../Reducer';
import { useThemeContext } from '../UseThemeContext';

export default function useGuideLineBreakpoint(): StateGuideLineBreakpointType {
  const {
    state: { guideLineBreakpoint },
  }: ThemeContextType = useThemeContext();
  return guideLineBreakpoint;
}
