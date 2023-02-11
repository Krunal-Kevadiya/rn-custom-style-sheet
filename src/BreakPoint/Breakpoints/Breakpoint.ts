import type { StateGuideLineBreakpointType } from '../../Core';
import { MediaQueryProps } from '../../MediaQuery';
import { hasValidBreakpointFormat } from '../Utils';
import type { KeyType } from './BreakPointTypes';

export const breakpointValue = {
  'base': 0,
  'sm': 480,
  'md': 768,
  'lg': 992,
  'xl': 1280,
  '2xl': 1536,
};

export function up(
  key: KeyType,
  guideLineBreakpoint: StateGuideLineBreakpointType
) {
  const { unit } = guideLineBreakpoint;
  const value: number = hasValidBreakpointFormat(key, guideLineBreakpoint);
  return `${MediaQueryProps.PREFIX} (min-width:${value}${unit})`;
}

export function down(
  key: KeyType,
  guideLineBreakpoint: StateGuideLineBreakpointType
) {
  const { unit, step } = guideLineBreakpoint;
  const value: number = hasValidBreakpointFormat(key, guideLineBreakpoint);
  return `${MediaQueryProps.PREFIX} (max-width:${value - step / 100}${unit})`;
}

export function between(
  start: KeyType,
  end: KeyType,
  guideLineBreakpoint: StateGuideLineBreakpointType
) {
  const { unit, step, keys } = guideLineBreakpoint;
  const endIndex: number = keys.indexOf(String(end));
  const startValue: number = hasValidBreakpointFormat(
    start,
    guideLineBreakpoint
  );
  const endValue: number =
    endIndex !== -1
      ? hasValidBreakpointFormat(keys[endIndex], guideLineBreakpoint)
      : Number(end);

  return (
    `${MediaQueryProps.PREFIX} (min-width:${startValue}${unit}) and ` +
    `(max-width:${endValue - step / 100}${unit})`
  );
}

export function only(
  key: KeyType,
  guideLineBreakpoint: StateGuideLineBreakpointType
) {
  const { keys } = guideLineBreakpoint;
  if (keys.indexOf(String(key)) + 1 < keys.length) {
    return between(
      key,
      keys[keys.indexOf(String(key)) + 1],
      guideLineBreakpoint
    );
  }

  return up(key, guideLineBreakpoint);
}

export function not(
  key: KeyType,
  guideLineBreakpoint: StateGuideLineBreakpointType
) {
  const { keys } = guideLineBreakpoint;
  // handle first and last key separately, for better readability
  const keyIndex = keys.indexOf(String(key));
  if (keyIndex === 0) {
    return up(keys[1], guideLineBreakpoint);
  }
  if (keyIndex === keys.length - 1) {
    return down(keys[keyIndex], guideLineBreakpoint);
  }

  return between(
    key,
    keys[keys.indexOf(String(key)) + 1],
    guideLineBreakpoint
  ).replace(
    `${MediaQueryProps.PREFIX}`,
    `${MediaQueryProps.PREFIX} not all and`
  );
}
