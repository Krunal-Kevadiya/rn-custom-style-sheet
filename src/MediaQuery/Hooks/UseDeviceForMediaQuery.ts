import { useThemeContext } from '../../Hooks';
import type { MediaQueryAllQueryable } from '../Types';

export default function useDeviceForMediaQuery(): Partial<MediaQueryAllQueryable> | undefined {
  const { deviceForMediaQuery } = useThemeContext();
  return deviceForMediaQuery;
}
