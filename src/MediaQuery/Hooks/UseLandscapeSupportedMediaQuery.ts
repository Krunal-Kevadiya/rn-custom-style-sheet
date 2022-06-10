import { useThemeContext } from '../../Hooks';

export default function useLandscapeSupportedMediaQuery(): boolean {
  const { isMediaQuerySupportedOrientation } = useThemeContext();
  return isMediaQuerySupportedOrientation;
}
