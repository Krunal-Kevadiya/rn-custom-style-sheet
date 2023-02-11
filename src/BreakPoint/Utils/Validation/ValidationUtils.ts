import type { KeyType } from '../../Breakpoints';
import type { StateGuideLineBreakpointType } from '../../../Core';

export function hasValidBreakpointFormat(
  key: KeyType,
  guideLineBreakpoint: StateGuideLineBreakpointType
): number {
  const { values, keys } = guideLineBreakpoint;
  if (key && typeof key === 'number') {
    return Number(key);
  } else if (key && values.hasOwnProperty(key)) {
    if (typeof values[key] === 'number') {
      return values[key] ?? 0;
    } else {
      return Number(values[key]);
    }
  } else {
    throw new SyntaxError(
      `Invalid break point :- "${key}". Currently support ${keys.join(
        ' | '
      )} those break point keys.`
    );
  }
}

export function hasValidBreakpointPropertyFormat(
  breakValues: any,
  guideLineBreakpoint: StateGuideLineBreakpointType
): boolean {
  if (Array.isArray(breakValues)) {
    return breakValues.length > 0 ? true : false;
  } else if (
    breakValues &&
    typeof breakValues === 'object' &&
    Object.keys(breakValues).length > 0
  ) {
    const { values } = guideLineBreakpoint;
    const keys = Object.keys(breakValues);
    for (let i = 0; i < keys.length; i++) {
      if (!values.hasOwnProperty(keys[i] || '')) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}
