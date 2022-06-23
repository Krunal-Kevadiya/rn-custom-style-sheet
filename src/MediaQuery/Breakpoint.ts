import { configs } from '../Config';
import mediaQueryPrefix from './MediaQueryPropType';

export function sortBreakpointValues(values: Record<string, number>): Record<string, number> {
  const breakpointsAsArray = Object.keys(values).map((key) => ({ key, val: values[key] })) || [];
  // Sort in ascending order
  breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
  return breakpointsAsArray.reduce((acc, obj) => {
    return { ...acc, [obj.key]: obj.val };
  }, {});
}

function hasValidBreakpointFormat(key: string | number): number {
  const { breakpointValues, breakpointValuesKeys } = configs;
  if (typeof key === 'number') {
    return Number(key);
  } else if (breakpointValues.hasOwnProperty(key)) {
    if (typeof breakpointValues[key] === 'number') {
      return breakpointValues[key];
    } else {
      return Number(breakpointValues[key]);
    }
  } else {
    throw new SyntaxError(
      `Invalid media query break point :- "${key}". Currently support ${breakpointValuesKeys.join(
        ' | '
      )} those break point keys.`
    );
  }
}

export function up(key: string | number) {
  const { breakpointUnit } = configs;
  const value: number = hasValidBreakpointFormat(key);
  return `${mediaQueryPrefix.PREFIX} (min-width:${value}${breakpointUnit})`;
}

export function down(key: string | number) {
  const { breakpointUnit, breakpointStep } = configs;
  const value: number = hasValidBreakpointFormat(key);
  return `${mediaQueryPrefix.PREFIX} (max-width:${value - breakpointStep / 100}${breakpointUnit})`;
}

export function between(start: string | number, end: string | number) {
  const { breakpointUnit, breakpointStep, breakpointValuesKeys } = configs;
  const endIndex: number = breakpointValuesKeys.indexOf(String(end));
  const startValue: number = hasValidBreakpointFormat(start);
  const endValue: number = endIndex !== -1 ? hasValidBreakpointFormat(breakpointValuesKeys[endIndex]) : Number(end);

  return (
    `${mediaQueryPrefix.PREFIX} (min-width:${startValue}${breakpointUnit}) and ` +
    `(max-width:${endValue - breakpointStep / 100}${breakpointUnit})`
  );
}

export function only(key: string | number) {
  const { breakpointValuesKeys } = configs;
  if (breakpointValuesKeys.indexOf(String(key)) + 1 < breakpointValuesKeys.length) {
    return between(key, breakpointValuesKeys[breakpointValuesKeys.indexOf(String(key)) + 1]);
  }

  return up(key);
}

export function not(key: string | number) {
  const { breakpointValuesKeys } = configs;
  // handle first and last key separately, for better readability
  const keyIndex = breakpointValuesKeys.indexOf(String(key));
  if (keyIndex === 0) {
    return up(breakpointValuesKeys[1]);
  }
  if (keyIndex === breakpointValuesKeys.length - 1) {
    return down(breakpointValuesKeys[keyIndex]);
  }

  return between(key, breakpointValuesKeys[breakpointValuesKeys.indexOf(String(key)) + 1]).replace(
    `${mediaQueryPrefix.PREFIX}`,
    `${mediaQueryPrefix.PREFIX} not all and`
  );
}
