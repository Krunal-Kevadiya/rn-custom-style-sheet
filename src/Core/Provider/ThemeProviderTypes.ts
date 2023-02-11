import type React from 'react';

import type { MediaQueryAllQueryable } from '../../MediaQuery';
import type { UnitEnum } from '../Utils';
import type { BreakPointType } from '../../BreakPoint';

export type GuideLineLayoutType = {
  width: number;
  height: number;
  aspectRatioFunction?: (size: number) => number;
};

export type GuideLineBreakpointType = {
  values: BreakPointType;
  unit: UnitEnum;
  step: number;
};

export type GetStorageType = (key: string, defaultValue: string) => string;

export type SetStorageType = (key: string, newValue: string) => void;

export type GuideLineStorageType = {
  getStorage: GetStorageType;
  setStorage: SetStorageType;
};

export type BaseSizeLayoutType = {
  thresholdOfPhone: number;
  thresholdOfTablet: number;
  androidTabletRatio: number;
  thresholdFunction: (baseSizeRatio: number, isTablet: boolean) => number;
};

export type ThemeProviderType = {
  children: React.ReactNode;
  isSupportedOrientation: boolean;
  isUsedBuiltInAspectRatioFunction: boolean;
  withPortraitBehaviorInLandscapeMode: boolean;
  deviceForMediaQuery?: Partial<MediaQueryAllQueryable>;
  guideLineLayout?: GuideLineLayoutType;
  guideLineBreakpoint?: Partial<GuideLineBreakpointType>;
  storage: GuideLineStorageType;
  appThemeName: string;
  baseSizeLayout?: Partial<BaseSizeLayoutType>;
};
