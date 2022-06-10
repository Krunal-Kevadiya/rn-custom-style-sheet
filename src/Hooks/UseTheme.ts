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
): T {
  const type: ThemeType = useCurrentTheme();
  const isRefreshConfig: boolean = useRefreshConfig();
  const orientation: OrientationType = useCurrentOrientation();

  const styles: T = useDeepCompareMemo<T>(
    () => styleSheetFn({ type, device }),
    [type, device, orientation, isRefreshConfig]
  );
  return styles;
}
