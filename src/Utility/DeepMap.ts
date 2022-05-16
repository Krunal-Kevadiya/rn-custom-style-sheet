import { themeStyleProcessor } from './StyleProcess';
import type { ThemeType } from './Types';

function isObject(myVar?: object): boolean | undefined {
  return myVar && typeof myVar === 'object';
}

// @ts-ignore
function mapObject(obj: object, type?: ThemeType, fn): object {
  const newStyle = Object.keys(obj).reduce((res, key) => {
    // @ts-ignore
    res[key] = fn(obj[key]);
    return res;
  }, {});
  return type ? themeStyleProcessor(newStyle, type) : newStyle;
}

// @ts-ignore
export function deepMap(obj: object, type: ThemeType, fn): object {
  function deepMapper(val: object) {
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
