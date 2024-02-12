import type { breakpointValue } from './Breakpoint';

export type KeyType = string | number | undefined;

export type BreakPointSortType = {
  key: string;
  val: number;
};

export type BreakPointType = Partial<typeof breakpointValue> &
  Record<string, number>;

type BreakpointPartial<T> = { [P in keyof T]?: string | number };

export type BreakPointValueType = BreakpointPartial<typeof breakpointValue> &
  Record<string, string | number>;
