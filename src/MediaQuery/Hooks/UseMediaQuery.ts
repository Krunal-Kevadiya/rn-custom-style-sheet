import { useEffect } from 'react';

import { useDeepCompareMemo } from '../../Hooks';
import matchMedia from '../MatchMediaQuery';
import mediaQuery from '../MediaQueryPropType';
import toQuery from '../ToQuery';
import type { MatchMediaReturnType, MediaQueryAllQueryable } from '../Types';
import useIsUpdate from './UseIsUpdate';

export type MediaQuerySettings = Partial<MediaQueryAllQueryable & { query?: string }>;

export function makeQuery(settings: MediaQuerySettings): string {
  return settings.query?.replace(mediaQuery.PREFIX, '')?.trim() || toQuery(settings);
}

function useMediaQuery(
  settings: MediaQuerySettings,
  device: Partial<MediaQueryAllQueryable>,
  onChange?: (_: boolean) => void
): boolean {
  const query: string = useDeepCompareMemo(() => makeQuery(settings), [settings]);
  if (query === undefined || query === null || query?.trim() === '' || (query?.trim()?.length ?? 0) === 0) {
    throw new Error('Invalid or missing MediaQuery!');
  }
  const mq: MatchMediaReturnType = useDeepCompareMemo(() => matchMedia(query, device), [query, device]);
  const isUpdate = useIsUpdate();

  useEffect(() => {
    if (isUpdate) {
      onChange?.(mq.isMatches);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mq.isMatches]);

  return mq.isMatches;
}

export default useMediaQuery;
