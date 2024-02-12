import type { ThemeContextType } from '../../Context';
import { OrientationEnum } from '../../Reducer';
import { useThemeContext } from '../UseThemeContext';

export default function useCurrentOrientation(): OrientationEnum {
  const {
    state: { orientation, isSupportedOrientation },
  }: ThemeContextType = useThemeContext();
  return isSupportedOrientation ? orientation : OrientationEnum.Portrait;
}
