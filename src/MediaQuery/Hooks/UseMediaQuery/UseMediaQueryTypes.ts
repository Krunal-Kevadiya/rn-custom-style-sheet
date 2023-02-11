import type { MediaQueryAllQueryable } from '../../Components';

export type MediaQuerySettings = Partial<
  MediaQueryAllQueryable & { query?: string }
>;
