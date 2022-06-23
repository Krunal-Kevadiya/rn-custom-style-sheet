import type { OrientationType } from '../ThemeReducers';
import useThemeContext from './UseThemeContext';

export default function useCurrentOrientation(): OrientationType {
  const {
    state: { orientation, isThemeSupportedOrientation }
  } = useThemeContext();
  return isThemeSupportedOrientation ? orientation : 'portrait';
}
