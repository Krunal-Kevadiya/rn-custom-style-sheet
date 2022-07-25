import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import type { MediaQueryAllQueryable } from './MediaQuery';
import type {
  ScaleImageStyle,
  ScaleTextStyle,
  ScaleThemeImageStyle,
  ScaleThemeTextStyle,
  ScaleThemeViewStyle,
  ScaleViewStyle,
  StyleOption,
  ThemeImageStyle,
  ThemeTextStyle,
  ThemeType,
  ThemeViewStyle
} from './Utility';
import { deepNestedMap, scaleFunc } from './Utility';

namespace CustomStyleSheet {
  type BoundThemeStyles<T> = {
    [P in keyof T]: T[P] extends object ? BoundThemeStyles<T[P]> : ThemeViewStyle | ThemeTextStyle | ThemeImageStyle;
  };

  type BoundScaleStyles<T> = {
    [P in keyof T]: T[P] extends object ? BoundScaleStyles<T[P]> : ScaleViewStyle | ScaleTextStyle | ScaleImageStyle;
  };

  type BoundScaleThemeStyles<T> = {
    [P in keyof T]: T[P] extends object
      ? BoundScaleThemeStyles<T[P]>
      : ScaleThemeViewStyle | ScaleThemeTextStyle | ScaleThemeImageStyle;
  };

  type ReturnStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
  };

  export function create<T = ReturnStyles<any>>(
    styles:
      | T
      | BoundThemeStyles<T>
      | BoundScaleStyles<T>
      | BoundScaleThemeStyles<T>
      | BoundThemeStyles<any>
      | BoundScaleStyles<any>
      | BoundScaleThemeStyles<any>,
    option?: StyleOption
  ): ReturnStyles<T> {
    const localOnlyTheme: boolean = option?.onlyTheme ?? false;
    const localScaleTheme: boolean = option?.onlyScale ?? false;
    const localType: ThemeType = option?.type ?? 'light';
    const localDevice: Partial<MediaQueryAllQueryable> | undefined = option?.device;

    return deepNestedMap({
      styles,
      device: localDevice,
      type: localScaleTheme ? undefined : localType,
      scaleFunc: localOnlyTheme ? undefined : scaleFunc
    }) as ReturnStyles<T>;
  }
}

// CustomStyleSheet will take the same stylesObject a regular StyleSheet will take, plus a special (optional)
// annotation that will automatically apply the scale functions for you:

// <size>@s - will apply scale function on size.
// <size>@vs - will apply verticalScale function on size.
// <size>@ms - will apply moderateScale function with resize factor of 0.5 on size.
// <size>@mvs - will apply moderateVerticalScale function with resize factor of 0.5 on size.
// <size>@ms<factor> - will apply moderateScale function with resize factor of factor on size.
// <size>@mvs<factor> - will apply moderateVerticalScale function with resize factor of factor on size.
// <size>@ssar/<size>@mvs<factor>sar - ScaledSheet also supports skip aspect ratio the result, simply add 'sar' at the end of the annotation and before 'r'.
// <size>@sr/<size>@mvs<factor>r - ScaledSheet also supports rounding the result, simply add 'r' at the end of the annotation.
export default CustomStyleSheet;
