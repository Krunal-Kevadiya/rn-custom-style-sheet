import hyphenate from 'hyphenate-style-name';

import { type MediaQueryAllQueryable, MediaQueryProps } from '../../Components';
import type { KeyValuesTypes } from './ToQueryTypes';

function negate(cond: string): string {
  return `not ${cond}`;
}

function keyVal(k: string, v: KeyValuesTypes): string {
  const realKey = hyphenate(k);
  // px shorthand
  if (typeof v === 'number') {
    v = `${v}px`;
  }
  if (v === true) {
    return realKey;
  }
  if (v === false) {
    return negate(realKey);
  }
  return `(${realKey}: ${v})`;
}

function join(conditions: string[]): string {
  return conditions.join(' and ');
}

function toQuery(obj: Partial<MediaQueryAllQueryable>): string {
  const rules: string[] = [];
  Object.keys(MediaQueryProps.all).forEach((k: string) => {
    const v: KeyValuesTypes = obj[k as keyof MediaQueryAllQueryable];
    if (v != null) {
      rules.push(keyVal(k, v));
    }
  });
  return join(rules);
}

export default toQuery;
