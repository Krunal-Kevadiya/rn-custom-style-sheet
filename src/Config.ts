import { sortBreakpointValues } from './MediaQuery';
import { getNewSize } from './Utility';

const breakpointValue = Object.freeze({
  base: 0,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1280,
  '2xl': 1536
});

export type BreakpointUnitType = 'em' | 'rem' | 'px' | 'cm' | 'mm' | 'in' | 'pt' | 'pc';
export type GetStorageStringType = <T extends string>(key: string, defaultValue: T) => T;
export type SetStorageStringType = <T extends string>(key: string, newValue: T) => void;

// Default guideline sizes are based on standard ~5" screen mobile device
type ConfigType = {
  guidelineBaseWidth: number;
  guidelineBaseHeight: number;
  guidelineBaseAspectRatioFn: (size: number) => number;
  breakpointValues: Record<string, number>;
  breakpointUnit: BreakpointUnitType;
  breakpointStep: number;
  breakpointValuesKeys: string[];
  appThemeKey: string;
  systemThemeKey: string;
};

export let configs = Object.freeze<ConfigType>({
  guidelineBaseWidth: 375,
  guidelineBaseHeight: 812,
  guidelineBaseAspectRatioFn: (size: number) => size,
  breakpointValues: breakpointValue,
  breakpointUnit: 'px',
  breakpointStep: 0,
  breakpointValuesKeys: Object.keys(sortBreakpointValues(breakpointValue)),
  appThemeKey: 'appTheme',
  systemThemeKey: 'systemTheme'
});

export function config(
  guideLineBaseWidth?: number,
  guideLineBaseHeight?: number,
  guideLineBreakpointValues?: Record<string, number>,
  guideLineBreakpointUnit?: BreakpointUnitType,
  guideLineBreakpointStep?: number,
  isUsedBuiltInAspectRatioFunction?: boolean,
  guideLineAspectRatioFunction?: (size: number) => number
): void {
  const breakpointValues: Record<string, number> = guideLineBreakpointValues ?? breakpointValue;

  configs = Object.assign({}, configs, {
    guidelineBaseWidth: guideLineBaseWidth ?? 375,
    guidelineBaseHeight: guideLineBaseHeight ?? 812,
    guidelineBaseAspectRatioFn:
      guideLineAspectRatioFunction ?? (isUsedBuiltInAspectRatioFunction ? getNewSize : (size: number) => size),
    breakpointValues: breakpointValues,
    breakpointUnit: guideLineBreakpointUnit,
    breakpointStep: guideLineBreakpointStep,
    breakpointValuesKeys: Object.keys(sortBreakpointValues(breakpointValues))
  });
}
