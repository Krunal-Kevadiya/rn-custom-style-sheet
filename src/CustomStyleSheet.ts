import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import type { CustomImageStyle, CustomTextStyle, CustomViewStyle, ExpandString, ThemeType } from './Utility';
import { deepMap, getNewSize, scaleFunc } from './Utility';

// Default guideline sizes are based on standard ~5" screen mobile device
export let configs = Object.freeze({
  guidelineBaseWidth: 375,
  guidelineBaseHeight: 812,
  guidelineBaseAspectRatioFn: getNewSize
});

namespace CustomStyleSheet {
  type NamedThemeStyles<T> = {
    [P in keyof T]:
      | CustomTextStyle
      | CustomViewStyle
      | CustomImageStyle
      | ExpandString<TextStyle>
      | ExpandString<ViewStyle>
      | ExpandString<ImageStyle>;
  };

  type NamedScaleStyles<T> = {
    [P in keyof T]: ExpandString<TextStyle> | ExpandString<ViewStyle> | ExpandString<ImageStyle>;
  };

  type ReturnNamedStyles<T> = {
    [P in keyof T]: TextStyle | ViewStyle | ImageStyle;
  };

  export function config(
    guideLineBase?: Partial<{ height: number; width: number }>,
    aspectRatioFn?: (size: number) => number
  ): void {
    configs = Object.assign({}, configs, {
      guidelineBaseWidth: guideLineBase?.width ?? 375,
      guidelineBaseHeight: guideLineBase?.height ?? 812,
      guidelineBaseAspectRatioFn: aspectRatioFn ?? getNewSize
    });
  }

  export function createTheme<T extends ReturnNamedStyles<T> | ReturnNamedStyles<any>>(
    styles: T | NamedThemeStyles<T> | NamedThemeStyles<any>,
    type: ThemeType = 'light'
  ): T | ReturnNamedStyles<T> | ReturnNamedStyles<any> {
    // @ts-ignore
    return deepMap(styles, type, undefined);
  }

  export function createScaled<T extends ReturnNamedStyles<T> | ReturnNamedStyles<any>>(
    styles: T | NamedScaleStyles<T> | NamedScaleStyles<any>
  ): T | ReturnNamedStyles<T> | ReturnNamedStyles<any> {
    // @ts-ignore
    return deepMap(styles, undefined, scaleFunc);
  }

  export function createScaledTheme<T extends ReturnNamedStyles<T> | ReturnNamedStyles<any>>(
    styles: T | NamedThemeStyles<T> | NamedThemeStyles<any>,
    type: ThemeType = 'light'
  ): T | ReturnNamedStyles<T> | ReturnNamedStyles<any> {
    // @ts-ignore
    return deepMap(styles, type, scaleFunc);
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
