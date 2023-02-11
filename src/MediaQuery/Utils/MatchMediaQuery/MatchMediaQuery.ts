'use strict';

import { between, down, not, only, up } from '../../../BreakPoint';
import { toPx, type StateGuideLineBreakpointType } from '../../../Core';
import type {
  MatchMediaReturnType,
  MediaQueryMatchers,
} from '../../Components';
import { makeQuery } from '../../Hooks';
import type {
  Expression,
  MediaValues,
  QueryNode,
} from './MatchMediaQueryTypes';

const RE_MEDIA_QUERY: RegExp =
  // eslint-disable-next-line no-useless-escape
  /^(?:(only|not)?\s*([_a-z][_a-z0-9-]*)|(\([^\)]+\)))(?:\s*and\s*(.*))?$/i;
const RE_MQ_EXPRESSION: RegExp =
  // eslint-disable-next-line no-useless-escape
  /^\(\s*([_a-z-][_a-z0-9-]*)\s*(?:\:\s*([^\)]+))?\s*\)$/;
const RE_MQ_FEATURE: RegExp = /^(?:(min|max|up|down|between|only|not)-)?(.+)/;
const RE_LENGTH_UNIT: RegExp = /(em|rem|px|cm|mm|in|pt|pc)?\s*$/;
const RE_RESOLUTION_UNIT: RegExp = /(dpi|dpcm|dppx)?\s*$/;
const RE_COMMENTS: RegExp = /\/\*[^*]*\*+([^/][^*]*\*+)*\//gi;

function matchQuery(
  mediaQuery: string,
  values: Partial<MediaValues>,
  guideLineBreakpoint: StateGuideLineBreakpointType
): boolean {
  return parseQuery(mediaQuery).some(function (query) {
    const inverse: boolean = query.inverse;
    //const only: boolean = query.only || false;

    // Either the parsed or specified `type` is "all", or the types must be
    // equal for a match.
    const typeMatch: boolean =
      query.type === 'all' || values.type === query.type;

    // Quit early when `type` doesn't match, but take "not" into account.
    //only !== (values.only ?? false)
    if ((typeMatch && inverse) || !(typeMatch || inverse)) {
      return false;
    }

    const expressionsMatch: boolean = query.expressions.every(function (
      expression: Expression
    ) {
      const feature: string = expression.feature;
      const modifier: string = expression.modifier;
      let expValue: string | number = expression.value;
      //@ts-ignore
      let value: any = values[feature];

      // Missing or falsy values don't match.
      if (!value && value !== 0 && feature !== 'breakpoint') {
        return false;
      }

      switch (feature) {
        case 'orientation':
        case 'scan':
          return value.toLowerCase() === expValue.toLowerCase();

        case 'width':
        case 'height':
        case 'device-width':
        case 'device-height':
          expValue = convertPx(expValue);
          value = convertPx(value);
          break;

        case 'resolution':
          expValue = toDpi(expValue);
          value = toDpi(value);
          break;

        case 'aspect-ratio':
        case 'device-aspect-ratio':
        case /* Deprecated */ 'device-pixel-ratio':
          expValue = toDecimal(expValue);
          value = toDecimal(value);
          break;

        case 'pixel-ratio':
          expValue = toDecimal(expValue);
          value = toDecimal(value);
          break;

        case 'grid':
        case 'color':
        case 'color-index':
        case 'monochrome':
          expValue = parseInt(expValue, 10) || 1;
          value = parseInt(value, 10) || 0;
          break;

        case 'breakpoint': {
          switch (modifier) {
            case 'up':
              return matchQuery(
                makeQuery({ query: up(expValue, guideLineBreakpoint) }),
                values,
                guideLineBreakpoint
              );
            case 'down':
              return matchQuery(
                makeQuery({ query: down(expValue, guideLineBreakpoint) }),
                values,
                guideLineBreakpoint
              );
            case 'between':
              const range: string[] = expValue
                .replaceAll('[', '')
                .replaceAll(']', '')
                .split(',')
                .map(item => item.trim());
              return matchQuery(
                makeQuery({
                  query: between(range[0], range[1], guideLineBreakpoint),
                }),
                values,
                guideLineBreakpoint
              );
            case 'only':
              return matchQuery(
                makeQuery({ query: only(expValue, guideLineBreakpoint) }),
                values,
                guideLineBreakpoint
              );
            case 'not':
              return matchQuery(
                makeQuery({ query: not(expValue, guideLineBreakpoint) }),
                values,
                guideLineBreakpoint
              );
            default:
              return value === expValue;
          }
        }

        default: //any
      }

      switch (modifier) {
        case 'min':
          return value >= expValue;
        case 'max':
          return value <= expValue;
        default:
          return value === expValue;
      }
    });

    return (expressionsMatch && !inverse) || (!expressionsMatch && inverse);
  });
}

function parseQuery(mediaQuery: string): QueryNode[] {
  return mediaQuery.split('#').map(function (query: string) {
    // Remove comments first
    query = query.replace(RE_COMMENTS, '');
    query = query.trim();

    const captures: RegExpMatchArray | null = query.match(RE_MEDIA_QUERY);

    // Media Query must be valid.
    if (!captures) {
      throw new SyntaxError('Invalid CSS media query : "' + query + '"');
    }

    const modifier: string = (captures[1] ?? '').trim();
    const type: string = (captures[2] ?? '').trim();
    const expressions: string = (
      (captures[3] ?? '') + (captures[4] ?? '')
    ).trim();
    const parsed: QueryNode = {
      only: false,
      inverse: false,
      type: '',
      expressions: [],
    };

    parsed.only = !!modifier && modifier.toLowerCase() === 'only';
    parsed.inverse = !!modifier && modifier.toLowerCase() === 'not';
    parsed.type = type ? type.toLowerCase() : 'all';

    // Check for media query expressions.
    if (!expressions) {
      parsed.expressions = [];
      return parsed;
    }

    // Split expressions into a list.
    const expressionList: RegExpMatchArray | null =
      // eslint-disable-next-line no-useless-escape
      expressions.match(/\([^\)]+\)/g);

    // Media Query must be valid.
    if (!expressionList) {
      throw new SyntaxError('Invalid CSS media query :- "' + expressions + '"');
    }

    parsed.expressions = expressionList.map(function (expression: string) {
      const capturesInner: RegExpMatchArray | null =
        expression.match(RE_MQ_EXPRESSION);

      // Media Query must be valid.
      if (!capturesInner) {
        throw new SyntaxError(
          'Invalid CSS media query := "' + expression + '"'
        );
      }

      const feature: RegExpMatchArray | null | undefined = capturesInner?.[1]
        ?.toLowerCase()
        ?.match(RE_MQ_FEATURE);

      return {
        modifier: feature?.[1] ?? '',
        feature: feature?.[2] ?? '',
        value: capturesInner?.[2] ?? '',
      };
    });

    return parsed;
  });
}

function toDecimal(ratio: any): number {
  let decimal: number = Number(ratio);
  let numbers;

  if (!decimal) {
    numbers = ratio.match(/^(\d+)\s*\/\s*(\d+)$/);
    decimal = numbers[1] / numbers[2];
  }

  return decimal;
}

function toDpi(resolution: any): number {
  const value: number = parseFloat(resolution);
  const units: string = String(resolution).match(RE_RESOLUTION_UNIT)?.[1] ?? '';

  switch (units) {
    case 'dpcm':
      return value / 2.54;
    case 'dppx':
      return value * 96;
    default:
      return value;
  }
}

function convertPx(length: any): number {
  const value: number = parseFloat(length);
  const units: string = String(length).match(RE_LENGTH_UNIT)?.[1] ?? '';

  return toPx(value, units);
}

function matchMedia(
  query: string,
  values: MediaQueryMatchers,
  guideLineBreakpoint: StateGuideLineBreakpointType
): MatchMediaReturnType {
  const isMatches: boolean = matchQuery(query, values, guideLineBreakpoint);
  const media: string = query;

  return { isMatches, media };
}

export default matchMedia;
