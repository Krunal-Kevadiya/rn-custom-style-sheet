import { makeQuery, matchMedia, MediaQueryProps } from '../../../MediaQuery';
import { ShortHandProperties, type ScaleFuncType } from '../Scale';
import type { DeepMapArgType } from './DeepMapTypes';
import { getObjectDepth } from './Flatten';

/**
 * Is object
 * @param {*} obj
 */
function isObject(obj: any): boolean {
  return obj !== null && obj !== undefined && typeof obj === 'object';
}

/**
 * Is string is media query
 * @param {String} str
 */
function isMediaQuery(str: any): boolean {
  return (
    str !== null &&
    str !== undefined &&
    typeof str === 'string' &&
    str.length > 0 &&
    str.startsWith(MediaQueryProps.PREFIX)
  );
}

/**
 * Merge media query obj into parent obj
 * @param {Record<string, any>} obj
 * @param {Record<string, any>} mqObj
 */
function merge(obj: Record<string, any>, mqObj: Record<string, any>): void {
  Object.keys(mqObj).forEach((key: string) => {
    if (isObject(obj[key]) && isObject(mqObj[key])) {
      Object.assign(obj[key], mqObj[key]);
    } else {
      obj[key] = mqObj[key];
    }
  });
}

function convertValue(
  obj: Record<string, any> | any,
  fnScaleFunc?: ScaleFuncType
): Record<string, any> | any {
  if (isObject(obj)) {
    return Object.keys(obj).reduce((res, key) => {
      if (ShortHandProperties.hasOwnProperty(key)) {
        ShortHandProperties[key]?.forEach((keys: string) => {
          // @ts-ignore
          res[keys] = fnScaleFunc ? fnScaleFunc(obj[key]) : obj[key];
        });
      } else {
        // @ts-ignore
        res[key] = fnScaleFunc ? fnScaleFunc(obj[key]) : obj[key];
      }
      return res;
    }, {});
  } else {
    return fnScaleFunc ? fnScaleFunc(obj) : obj;
  }
}

export function styleProcess({
  styles,
  guideLineBreakpoint,
  device,
  scaleFunc,
}: DeepMapArgType): Record<string, any> {
  return Object.keys(styles).reduce(
    (resource: Record<string, any>, key: string) => {
      if (!isMediaQuery(key)) {
        if (getObjectDepth(styles[key], guideLineBreakpoint) > 1) {
          resource[key] = styleProcess({
            styles: styles[key],
            guideLineBreakpoint,
            device,
            scaleFunc,
          });
        } else {
          if (ShortHandProperties.hasOwnProperty(key)) {
            ShortHandProperties[key]?.forEach((keys: string) => {
              resource[keys] = convertValue(styles[key], scaleFunc);
            });
          } else {
            resource[key] = convertValue(styles[key], scaleFunc);
          }
        }
      } else {
        if (device !== null && device !== undefined) {
          const query: string = makeQuery({ query: key });
          if (
            query === undefined ||
            query === null ||
            query?.trim() === '' ||
            (query?.trim()?.length ?? 0) === 0
          ) {
            throw new Error('Invalid or missing MediaQuery!');
          }
          const { isMatches } = matchMedia(query, device, guideLineBreakpoint);
          if (isMatches) {
            merge(
              resource,
              styleProcess({
                styles: styles[key],
                guideLineBreakpoint,
                device,
                scaleFunc,
              })
            );
          }
        }
      }
      return resource;
    },
    {}
  );
}
