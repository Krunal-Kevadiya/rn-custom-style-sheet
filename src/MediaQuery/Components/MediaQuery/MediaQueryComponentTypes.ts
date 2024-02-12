import type { ReactElement } from 'react';

import type { MediaQueryAllQueryable } from './MediaQueryTypes';

export type MediaQueryPropsType = MediaQueryAllQueryable & {
  children: ReactElement | ((matches: boolean) => ReactElement) | null;
  query?: string;
  device: Partial<MediaQueryAllQueryable>;
  onChange?: (_matches: boolean) => void;
};
