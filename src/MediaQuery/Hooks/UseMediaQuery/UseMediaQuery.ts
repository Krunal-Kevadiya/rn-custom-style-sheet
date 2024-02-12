import { useEffect } from 'react';

import {
  type StateGuideLineBreakpointType,
  useDeepCompareMemo,
  useGuideLineBreakpoint,
} from '../../../Core';
import type {
  MatchMediaReturnType,
  MediaQueryAllQueryable,
} from '../../Components';
import { matchMedia } from '../../Utils';
import { useIsUpdate } from '../UseIsUpdate';
import type { MediaQuerySettings } from './UseMediaQueryTypes';
import { makeQuery } from './UseMediaQueryUtils';

function useMediaQuery(
  settings: MediaQuerySettings,
  device: Partial<MediaQueryAllQueryable>,
  onChange?: (_: boolean) => void
): boolean {
  const guideLineBreakpoint: StateGuideLineBreakpointType =
    useGuideLineBreakpoint();
  const query: string = useDeepCompareMemo(
    () => makeQuery(settings),
    [settings]
  );
  if (
    query === undefined ||
    query === null ||
    query?.trim() === '' ||
    (query?.trim()?.length ?? 0) === 0
  ) {
    throw new Error('Invalid or missing MediaQuery!');
  }
  const matchQuery: MatchMediaReturnType = useDeepCompareMemo(
    () => matchMedia(query, device, guideLineBreakpoint),
    [query, device, guideLineBreakpoint]
  );
  const isUpdate: boolean = useIsUpdate();

  useEffect(() => {
    if (isUpdate) {
      onChange?.(matchQuery.isMatches);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchQuery.isMatches]);

  return matchQuery.isMatches;
}

export default useMediaQuery;
