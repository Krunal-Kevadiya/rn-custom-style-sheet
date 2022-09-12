import type { MediaQueryAllQueryable } from '../MediaQuery';
import type { OrientationType } from '../ThemeReducers';
import type { StyleSheetOption, ThemeType } from '../Utility';
import useCurrentOrientation from './UseCurrentOrientation';
import useCurrentTheme from './UseCurrentTheme';
import useDeepCompareMemo from './UseDeepCompareMemo';
import useRefreshConfig from './UseRefreshConfig';

export default function useTheme<T>(
  styleSheetFn: (styleOption: StyleSheetOption) => T,
  device?: Partial<MediaQueryAllQueryable>
): { styles: T; theme: ThemeType } {
  const theme: ThemeType = useCurrentTheme();
  const isRefreshConfig: boolean = useRefreshConfig();
  const orientation: OrientationType = useCurrentOrientation();

  const styles: T = useDeepCompareMemo<T>(
    () => styleSheetFn({ theme, device }),
    [theme, device, orientation, isRefreshConfig]
  );
  return { styles, theme };
}
