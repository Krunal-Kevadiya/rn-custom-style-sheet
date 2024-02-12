import type { StateGuideLineBreakpointType } from '../../../Core';
import { hasValidBreakpointPropertyFormat } from '../../../BreakPoint';

function isBuffer(obj: any): boolean {
  return (
    obj &&
    obj.constructor &&
    typeof obj.constructor.isBuffer === 'function' &&
    obj.constructor.isBuffer(obj)
  );
}

function keyIdentity(key: string): string {
  return key;
}

function flatten(
  target: Record<string, any>,
  guideLineBreakpoint: StateGuideLineBreakpointType,
  opts: {
    delimiter?: string;
    maxDepth?: number;
    safe?: boolean;
    transformKey?: (key: string) => string;
  } = {}
): Record<string, any> {
  const delimiter: string = opts.delimiter || '.';
  const maxDepth: number | undefined = opts.maxDepth;
  const transformKey: (key: string) => string =
    opts.transformKey || keyIdentity;
  const output: Record<string, any> = {};

  function step(
    object: Record<string, any>,
    prev?: string,
    currentDepth: number = 1
  ) {
    Object.keys(object).forEach(function (key) {
      const value = object[key];
      const isarray: boolean | undefined = opts.safe && Array.isArray(value);
      const isbreakpoint: boolean | undefined =
        hasValidBreakpointPropertyFormat(value, guideLineBreakpoint);
      const type = Object.prototype.toString.call(value);
      const isbuffer: boolean = isBuffer(value);
      const isobject: boolean =
        type === '[object Object]' || type === '[object Array]';

      const newKey = prev
        ? prev + delimiter + transformKey(key)
        : transformKey(key);

      if (
        !isarray &&
        !isbuffer &&
        isobject &&
        !isbreakpoint &&
        Object.keys(value).length &&
        (!opts.maxDepth || currentDepth < maxDepth!)
      ) {
        return step(value, newKey, currentDepth + 1);
      }

      output[newKey] = value;
    });
  }

  step(target);
  return output;
}

export function getObjectDepth(
  obj: Record<string, any>,
  guideLineBreakpoint: StateGuideLineBreakpointType
): number {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return 0;
  }

  const flat = flatten(obj, guideLineBreakpoint);
  const keys = Object.keys(flat);
  if (keys.length === 0) {
    return 1;
  }

  const depthOfKeys = keys.map(key => key.split('.').length);
  return Math.max(...depthOfKeys);
}
