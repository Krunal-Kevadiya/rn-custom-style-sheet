import type { BreakPointSortType, BreakPointType } from '../../Breakpoints';

export function sortBreakpointValues(values: BreakPointType): BreakPointType {
  const breakpointsAsArray: BreakPointSortType[] =
    Object.keys(values).map(key => ({ key, val: values[key] ?? 0 })) || [];
  // Sort in ascending order
  breakpointsAsArray.sort(
    (breakpoint1: BreakPointSortType, breakpoint2: BreakPointSortType) =>
      breakpoint1.val - breakpoint2.val
  );
  return breakpointsAsArray.reduce(
    (acc: BreakPointType, obj: BreakPointSortType) => {
      return { ...acc, [obj.key]: obj.val };
    },
    {}
  );
}
