export type MediaQueryTypes = {
  all?: boolean;
  screen?: boolean;
  tv?: boolean;
  ios?: boolean;
  android?: boolean;
  windows?: boolean;
  macos?: boolean;
  web?: boolean;
};

export type MediaQueryType = keyof MediaQueryTypes;

export type MediaQueryMatchers = {
  aspectRatio?: number | string;
  deviceAspectRatio?: number | string;
  height?: number | string;
  deviceHeight?: number | string;
  width?: number | string;
  deviceWidth?: number | string;
  type?: MediaQueryType;
  direction?: 'rtl' | 'ltr';
  orientation?: 'portrait' | 'landscape';
};

export type MediaQueryFeatures = MediaQueryMatchers & {
  minAspectRatio?: string;
  maxAspectRatio?: string;

  minDeviceAspectRatio?: string;
  maxDeviceAspectRatio?: string;

  minHeight?: number | string;
  maxHeight?: number | string;

  minDeviceHeight?: number | string;
  maxDeviceHeight?: number | string;

  minWidth?: number | string;
  maxWidth?: number | string;

  minDeviceWidth?: number | string;
  maxDeviceWidth?: number | string;

  upBreakpoint?: number | string;
  downBreakpoint?: number | string;
  betweenBreakpoint?: [number, number] | [string, string];
  onlyBreakpoint?: number | string;
  notBreakpoint?: number | string;
};

export type MediaQueryAllQueryable = MediaQueryFeatures & MediaQueryTypes & {};

export type MatchMediaReturnType = {
  isMatches: boolean;
  media: string;
};
