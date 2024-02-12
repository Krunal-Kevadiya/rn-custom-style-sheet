import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import type {
  GuideLineLayoutType,
  ScreenResolutionType,
  StateGuideLineBreakpointType,
  GeneralScreenResolutionType,
  ThemeModeEnum,
} from '../../../Core';
import type { MediaQueryAllQueryable } from '../../../MediaQuery';
import type {
  ScaleViewStyle,
  ScaleTextStyle,
  ScaleImageStyle,
  ShortHandStyle,
} from '../../../Scaling';

export type NamedStyles<T> = {
  [P in keyof T]: Record<string, any>; //ViewStyle | TextStyle | ImageStyle | Record<string, any>;
};

export type ThemeStyleType = (
  | ViewStyle
  | TextStyle
  | ImageStyle
  | ScaleViewStyle
  | ScaleTextStyle
  | ScaleImageStyle
) &
  ShortHandStyle;

export type MediaQueryItemType = {
  [key: `@media ${string}`]: ThemeStyleType;
};

export type MediaQueryType<V> = V extends Record<string, any> | undefined
  ? {
      [K in keyof V]: ThemeStyleType;
    }
  : ThemeStyleType;

export type Merge<T, O> = T & O extends infer A
  ? { [P in keyof A]: A[P] }
  : never;

export type BoundStyles<T extends Record<string, any>> = Merge<
  {
    [P in keyof T as P extends `@media ${any}` ? P : never]: BoundStyles<T[P]>;
  },
  {
    [P in keyof T as P extends `@media ${any}` ? never : P]: MediaQueryType<
      T[P]
    >;
  }
>;

// Style sheet options
export type StyleSheetOption = {
  isDark: boolean;
  isPortrait: boolean;
  themeName: string;
  themeMode: ThemeModeEnum;
  screenResolution: ScreenResolutionType;
  guideLineLayout: GuideLineLayoutType;
  guideLineBreakpoint: StateGuideLineBreakpointType;
  generalScreenResolution: GeneralScreenResolutionType;
  currentBreakpointIndex: number;
  device: Partial<MediaQueryAllQueryable>;
  isDisableScaling?: boolean;
};
