import type { ColorValue, ImageStyle, TextStyle, ViewStyle } from 'react-native';

/** Dark or Light Themed */
export type ThemeType = 'light' | 'dark';

/** Dark Themed ViewStyle  */
export interface CustomViewStyle extends ViewStyle {
  backgroundColorDark?: ColorValue | undefined;
  borderBottomColorDark?: ColorValue | undefined;
  borderColorDark?: ColorValue | undefined;
  borderEndColorDark?: ColorValue | undefined;
  borderLeftColorDark?: ColorValue | undefined;
  borderRightColorDark?: ColorValue | undefined;
  borderStartColorDark?: ColorValue | undefined;
  borderTopColorDark?: ColorValue | undefined;
  shadowColorDark?: ColorValue | undefined;
}

/** Dark Themed TextStyle  */
export interface CustomTextStyle extends TextStyle, CustomViewStyle {
  colorDark: ColorValue | undefined;
  textShadowColorDark?: ColorValue | undefined;
  textDecorationColorDark?: ColorValue | undefined;
}

/** Dark Themed ImageStyle  */
export interface CustomImageStyle extends ImageStyle {
  backgroundColorDark?: ColorValue | undefined;
  shadowColorDark?: ColorValue | undefined;
  borderColorDark?: ColorValue | undefined;
  overlayColorDark?: ColorValue | undefined;
  tintColorDark?: ColorValue | undefined;
}

/**
 * Make all properties in T optional
 */
export type ExpandString<T> = {
  [P in keyof T]: T[P] | string;
};
