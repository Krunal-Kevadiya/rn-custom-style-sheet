import type { ThemeContextType } from '../../Context';
import type { GeneralScreenResolutionType } from '../../Reducer';
import { useThemeContext } from '../UseThemeContext';

export default function useGeneralScreenResolution(): GeneralScreenResolutionType {
  const {
    state: { generalScreenResolution },
  }: ThemeContextType = useThemeContext();
  return generalScreenResolution;
}
