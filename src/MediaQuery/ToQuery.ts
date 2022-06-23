import hyphenate from 'hyphenate-style-name';

import mq from './MediaQueryPropType';
import type { MediaQueryAllQueryable } from './Types';

function negate(cond: string): string {
  return `not ${cond}`;
}

type VTypes = string | number | boolean | [string, string] | [number, number] | undefined;

function keyVal(k: string, v: VTypes): string {
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

function join(conds: string[]): string {
  return conds.join(' and ');
}

function toQuery(obj: Partial<MediaQueryAllQueryable>): string {
  const rules: string[] = [];
  Object.keys(mq.all).forEach((k: string) => {
    const v: VTypes = obj[k as keyof MediaQueryAllQueryable];
    if (v != null) {
      rules.push(keyVal(k, v));
    }
  });
  return join(rules);
}

export default toQuery;
