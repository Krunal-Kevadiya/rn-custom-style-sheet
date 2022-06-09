import type { ColorValue, ImageStyle, TextStyle, ViewStyle } from 'react-native';

/** Dark or Light Themed */
export type ThemeType = 'light' | 'dark';

interface FlexStyleMe {
  borderBottomWidth?: string | number | undefined;
  borderEndWidth?: number | string | undefined;
  borderLeftWidth?: string | number | undefined;
  borderRightWidth?: string | number | undefined;
  borderStartWidth?: number | string | undefined;
  borderTopWidth?: string | number | undefined;
  borderWidth?: string | number | undefined;
  bottom?: number | string | undefined;
  end?: number | string | undefined;
  height?: number | string | undefined;
  left?: number | string | undefined;
  margin?: number | string | undefined;
  marginBottom?: number | string | undefined;
  marginEnd?: number | string | undefined;
  marginHorizontal?: number | string | undefined;
  marginLeft?: number | string | undefined;
  marginRight?: number | string | undefined;
  marginStart?: number | string | undefined;
  marginTop?: number | string | undefined;
  marginVertical?: number | string | undefined;
  maxHeight?: number | string | undefined;
  maxWidth?: number | string | undefined;
  minHeight?: number | string | undefined;
  minWidth?: number | string | undefined;
  padding?: number | string | undefined;
  paddingBottom?: number | string | undefined;
  paddingEnd?: number | string | undefined;
  paddingHorizontal?: number | string | undefined;
  paddingLeft?: number | string | undefined;
  paddingRight?: number | string | undefined;
  paddingStart?: number | string | undefined;
  paddingTop?: number | string | undefined;
  paddingVertical?: number | string | undefined;
  right?: number | string | undefined;
  start?: number | string | undefined;
  top?: number | string | undefined;
  width?: number | string | undefined;
}

interface ShadowStyleIOSMe {
  shadowOffset?: { width: string | number; height: string | number } | undefined;
  shadowRadius?: string | number | undefined;
}

interface TranslateXTransformMe {
  translateX: string | number;
}

interface TranslateYTransformMe {
  translateY: string | number;
}

interface TransformsStyleMe {
  transform?: (TranslateXTransformMe | TranslateYTransformMe)[] | undefined;
  translateX?: string | number | undefined;
  /**
   * @deprecated Use translateY in transform prop instead.
   */
  translateY?: string | number | undefined;
}

export interface ViewStyleMe extends FlexStyleMe, ShadowStyleIOSMe, TransformsStyleMe {
  borderBottomEndRadius?: string | number | undefined;
  borderBottomLeftRadius?: string | number | undefined;
  borderBottomRightRadius?: string | number | undefined;
  borderBottomStartRadius?: string | number | undefined;
  borderBottomWidth?: string | number | undefined;
  borderLeftWidth?: string | number | undefined;
  borderRadius?: string | number | undefined;
  borderRightWidth?: string | number | undefined;
  borderTopEndRadius?: string | number | undefined;
  borderTopLeftRadius?: string | number | undefined;
  borderTopRightRadius?: string | number | undefined;
  borderTopStartRadius?: string | number | undefined;
  borderTopWidth?: string | number | undefined;
  borderWidth?: string | number | undefined;
  /**
   * Sets the elevation of a view, using Android's underlying
   * [elevation API](https://developer.android.com/training/material/shadows-clipping.html#Elevation).
   * This adds a drop shadow to the item and affects z-order for overlapping views.
   * Only supported on Android 5.0+, has no effect on earlier versions.
   *
   * @platform android
   */
  elevation?: string | number | undefined;
}

interface TextStyleIOSMe extends ViewStyleMe {
  letterSpacing?: string | number | undefined;
}

export interface TextStyleMe extends TextStyleIOSMe, ViewStyleMe {
  fontSize?: string | number | undefined;
  letterSpacing?: string | number | undefined;
  lineHeight?: string | number | undefined;
  textShadowOffset?: { width: string | number; height: string | number } | undefined;
  textShadowRadius?: string | number | undefined;
}

export interface ImageStyleMe extends FlexStyleMe, ShadowStyleIOSMe, TransformsStyleMe {
  borderBottomLeftRadius?: string | number | undefined;
  borderBottomRightRadius?: string | number | undefined;
  borderWidth?: string | number | undefined;
  borderRadius?: string | number | undefined;
  borderTopLeftRadius?: string | number | undefined;
  borderTopRightRadius?: string | number | undefined;
}

/** Dark Themed ViewStyle  */
export interface CustomViewStyle extends ViewStyleMe {
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
export interface CustomTextStyle extends TextStyleMe, CustomViewStyle {
  colorDark: ColorValue | undefined;
  textShadowColorDark?: ColorValue | undefined;
  textDecorationColorDark?: ColorValue | undefined;
}

/** Dark Themed ImageStyle  */
export interface CustomImageStyle extends ImageStyleMe {
  backgroundColorDark?: ColorValue | undefined;
  shadowColorDark?: ColorValue | undefined;
  borderColorDark?: ColorValue | undefined;
  overlayColorDark?: ColorValue | undefined;
  tintColorDark?: ColorValue | undefined;
}

export type MyTextStyle = CustomTextStyle | TextStyleMe | TextStyle;
export type MyImageStyle = CustomImageStyle | ImageStyleMe | ImageStyle;
export type MyViewStyle = CustomViewStyle | ViewStyleMe | ViewStyle;
