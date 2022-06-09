import { themeStyleProcessor } from './StyleProcess';
import type { ThemeType } from './Types';

function isObject(myVar?: Record<string, any>): boolean | undefined {
  return myVar && typeof myVar === 'object';
}

// @ts-ignore
function mapObject(obj: Record<string, any>, type?: ThemeType, fn): Record<string, any> {
  const newStyle = Object.keys(obj).reduce((res, key) => {
    // @ts-ignore
    res[key] = fn(obj[key]);
    return res;
  }, {});
  return type ? themeStyleProcessor(newStyle, type) : newStyle;
}

// @ts-ignore
export function deepMap(obj: Record<string, any>, type: ThemeType | undefined, fn): Record<string, any> {
  function deepMapper(val: Record<string, any>) {
    return isObject(val) ? deepMap(val, type, fn) : fn ? fn(val) : val;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepMapper);
  }
  if (isObject(obj)) {
    return mapObject(obj, type, deepMapper);
  }
  return obj;
}
