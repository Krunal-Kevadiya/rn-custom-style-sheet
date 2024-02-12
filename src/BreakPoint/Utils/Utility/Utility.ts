import type { BreakPointType } from '../../Breakpoints';
import type { StateGuideLineBreakpointType } from '../../../Core';

export function getCurrentBreakpointIndex(
  values: BreakPointType,
  screenWidth: number
): number {
  const dimensionValues: number[] = Object.values(values);
  let index: number = -1;
  for (let i: number = 0; i < dimensionValues.length; i++) {
    const vl = dimensionValues[i];
    if (vl && vl === screenWidth) {
      index = i;
      break;
    } else if (vl && vl > screenWidth && i !== 0) {
      index = i - 1;
      break;
    } else if (vl && vl < screenWidth && i === dimensionValues.length - 1) {
      index = i;
      break;
    }
  }
  return index;
}

export function getBreakpointValueByIndex(
  values: Record<string, string | number> | string[] | number[],
  breakpointIndex: number,
  guideLineBreakpoint: StateGuideLineBreakpointType
): string | number | undefined {
  const { values: breakpointValues } = guideLineBreakpoint;
  const valArray: (string | number)[] = Array.isArray(values)
    ? values
    : Object.keys(breakpointValues)
        .map((point: string) => values[point] || '')
        .filter((point) => point !== '');

  return (
    valArray[breakpointIndex] ??
    valArray
      .slice(0, breakpointIndex + 1)
      .filter((v: any) => !(v === null || v === undefined))
      .pop()
  );
}
