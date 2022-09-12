import { makeQuery, matchMedia, MediaQueryAllQueryable } from '../MediaQuery';
import { mediaQueryPrefix } from '../MediaQuery';
import { themeStyleProcessor } from './StyleProcess';
import type { ThemeType } from './Types';

type DeepMapArgType = {
  styles: Record<string, any>;
  theme?: ThemeType;
  device?: Partial<MediaQueryAllQueryable>;
  scaleFunc?: any;
};

/**
 * Is object
 * @param {*} obj
 */
function isObject(obj: any) {
  return typeof obj === 'object' && obj !== null;
}

/**
 * Is string is media query
 * @param {String} str
 */
function isMediaQuery(str: any) {
  return typeof str === 'string' && str.indexOf(mediaQueryPrefix.PREFIX) === 0;
}

/**
 * Merge media query obj into parent obj
 * @param {Record<string, any>} obj
 * @param {Record<string, any>} mqObj
 */
function merge(obj: Record<string, any>, mqObj: Record<string, any>) {
  Object.keys(mqObj).forEach((key: string) => {
    if (isObject(obj[key]) && isObject(mqObj[key])) {
      Object.assign(obj[key], mqObj[key]);
    } else {
      obj[key] = mqObj[key];
    }
  });
}

// @ts-ignore
function convertValue(obj: Record<string, any> | any, fnScaleFunc): Record<string, any> | any {
  if (isObject(obj)) {
    return Object.keys(obj).reduce((res, key) => {
      // @ts-ignore
      res[key] = fnScaleFunc(obj[key]);
      return res;
    }, {});
  } else {
    return fnScaleFunc(obj);
  }
}

// @ts-ignore
function mapObject(obj: Record<string, any>, theme?: ThemeType, fnScaleFunc): Record<string, any> {
  const newStyle = Object.keys(obj).reduce((res, key) => {
    // @ts-ignore
    res[key] = fnScaleFunc ? convertValue(obj[key], fnScaleFunc) : obj[key];
    return res;
  }, {});
  return theme ? themeStyleProcessor(newStyle, theme) : newStyle;
}

function mapSingleObject(
  obj: Record<string, any>,
  theme?: ThemeType,
  device?: Partial<MediaQueryAllQueryable>,
  isNestedObject?: boolean,
  // @ts-ignore
  fnScaleFunc
): Record<string, any> {
  const mqKeys: string[] = [];

  const newStyle = Object.keys(obj).reduce((res, key) => {
    if (!isMediaQuery(key)) {
      // @ts-ignore
      res[key] = fnScaleFunc ? convertValue(obj[key], fnScaleFunc) : obj[key];
    } else {
      mqKeys.push(key);
    }
    return res;
  }, {});

  // apply media query stuff
  if (mqKeys.length && device !== null && device !== undefined) {
    mqKeys.forEach((key: string) => {
      const query: string = makeQuery({ query: key });
      if (query === undefined || query === null || query?.trim() === '' || (query?.trim()?.length ?? 0) === 0) {
        throw new Error('Invalid or missing MediaQuery!');
      }
      const { isMatches } = matchMedia(query, device);
      if (isMatches) {
        // here nested object
        merge(newStyle, mapObject(obj[key], isNestedObject ? theme : undefined, fnScaleFunc));
      }
    });
  }

  return theme ? themeStyleProcessor(newStyle, theme) : newStyle;
}

function mapNestedObject(
  obj: Record<string, any>,
  theme?: ThemeType,
  device?: Partial<MediaQueryAllQueryable>,
  // @ts-ignore
  fnScaleFunc
): Record<string, any> {
  const res: Record<string, any> = Object.keys(obj).reduce((resource: Record<string, any>, key: string) => {
    resource[key] = mapSingleObject(obj[key], theme, device, true, fnScaleFunc);
    return resource;
  }, {});
  return res;
}

export function deepMap({ styles, theme, device, scaleFunc }: DeepMapArgType): Record<string, any> {
  return mapSingleObject(styles, theme, device, false, scaleFunc);
}

export function deepNestedMap({ styles, theme, device, scaleFunc }: DeepMapArgType): Record<string, any> {
  const mqKeys: string[] = [];

  // copy non-media-query stuff
  const res: Record<string, any> = Object.keys(styles).reduce((resource: Record<string, any>, key: string) => {
    if (!isMediaQuery(key)) {
      resource[key] = mapSingleObject(styles[key], theme, device, true, scaleFunc);
    } else {
      mqKeys.push(key);
    }
    return resource;
  }, {});

  // apply media query stuff
  if (mqKeys.length && device !== null && device !== undefined) {
    mqKeys.forEach((key: string) => {
      const query: string = makeQuery({ query: key });
      if (query === undefined || query === null || query?.trim() === '' || (query?.trim()?.length ?? 0) === 0) {
        throw new Error('Invalid or missing MediaQuery!');
      }
      const { isMatches } = matchMedia(query, device);
      if (isMatches) {
        // here nested object
        merge(res, mapNestedObject(styles[key], theme, device, scaleFunc));
      }
    });
  }

  return res;
}
