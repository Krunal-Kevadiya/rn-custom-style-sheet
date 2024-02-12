import { MediaQueryProps } from '../../Components';
import { toQuery } from '../../Utils';
import type { MediaQuerySettings } from './UseMediaQueryTypes';

export function makeQuery(settings: MediaQuerySettings): string {
  return (
    settings.query?.replace(MediaQueryProps.PREFIX, '')?.trim() ??
    toQuery(settings)
  );
}
