import type {
  ColorValue,
  FlexStyle,
  ImageStyle,
  MatrixTransform,
  PerpectiveTransform,
  RotateTransform,
  RotateXTransform,
  RotateYTransform,
  RotateZTransform,
  ScaleTransform,
  ScaleXTransform,
  ScaleYTransform,
  ShadowStyleIOS,
  SkewXTransform,
  SkewYTransform,
  TextStyle,
  TextStyleIOS,
  TransformsStyle,
  TranslateXTransform,
  TranslateYTransform,
  ViewStyle
} from 'react-native';

import type { MediaQueryAllQueryable } from '../MediaQuery';

type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;

/** Dark or Light Themed */
export type ThemeType = 'light' | 'dark';

// Theme
export type ThemeViewStyle = {
  backgroundColorDark?: ColorValue | undefined;
  borderBottomColorDark?: ColorValue | undefined;
  borderColorDark?: ColorValue | undefined;
  borderEndColorDark?: ColorValue | undefined;
  borderLeftColorDark?: ColorValue | undefined;
  borderRightColorDark?: ColorValue | undefined;
  borderStartColorDark?: ColorValue | undefined;
  borderTopColorDark?: ColorValue | undefined;
  shadowColorDark?: ColorValue | undefined;
} & ViewStyle;

export type ThemeTextStyle = {
  colorDark: ColorValue | undefined;
  textShadowColorDark?: ColorValue | undefined;
  textDecorationColorDark?: ColorValue | undefined;
} & ThemeViewStyle &
  TextStyle &
  ViewStyle;

export type ThemeImageStyle = {
  backgroundColorDark?: ColorValue | undefined;
  shadowColorDark?: ColorValue | undefined;
  borderColorDark?: ColorValue | undefined;
  overlayColorDark?: ColorValue | undefined;
  tintColorDark?: ColorValue | undefined;
} & ImageStyle;

// Scale //
type ScaledFlexStyle = {
  borderBottomWidth?: string | number | undefined;
  borderEndWidth?: number | string | undefined;
  borderLeftWidth?: string | number | undefined;
  borderRightWidth?: string | number | undefined;
  borderStartWidth?: number | string | undefined;
  borderTopWidth?: string | number | undefined;
  borderWidth?: string | number | undefined;
};
type ScaleFlexStyle = Modify<FlexStyle, ScaledFlexStyle>;

type ScaledShadowStyleIOS = {
  shadowOffset?: { width: string | number; height: string | number } | undefined;
  shadowRadius?: string | number | undefined;
};
type ScaleShadowStyleIOS = Modify<ShadowStyleIOS, ScaledShadowStyleIOS>;

type ScaledTranslateXTransform = {
  translateX: string | number;
};
type ScaleTranslateXTransform = Modify<TranslateXTransform, ScaledTranslateXTransform>;

type ScaledTranslateYTransform = {
  translateY: string | number;
};
type ScaleTranslateYTransform = Modify<TranslateYTransform, ScaledTranslateYTransform>;

type ScaledTransformsStyle = {
  transform?:
    | (
        | PerpectiveTransform
        | RotateTransform
        | RotateXTransform
        | RotateYTransform
        | RotateZTransform
        | ScaleTransform
        | ScaleXTransform
        | ScaleYTransform
        | TranslateXTransform
        | TranslateYTransform
        | SkewXTransform
        | SkewYTransform
        | MatrixTransform
        | ScaleTranslateXTransform
        | ScaleTranslateYTransform
      )[]
    | undefined;
  translateX?: string | number | undefined;
  /**
   * @deprecated Use translateY in transform prop instead.
   */
  translateY?: string | number | undefined;
};
type ScaleTransformsStyle = Modify<TransformsStyle, ScaledTransformsStyle>;

type ScaledViewStyle = {
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
};
export type ScaleViewStyle = ScaleFlexStyle &
  ScaleShadowStyleIOS &
  ScaleTransformsStyle &
  Modify<ViewStyle, ScaledViewStyle>;

type ScaledTextStyleIOS = {
  letterSpacing?: string | number | undefined;
};
type ScaleTextStyleIOS = Modify<TextStyleIOS, ScaledTextStyleIOS> & ScaleViewStyle;

type ScaledTextStyle = {
  fontSize?: string | number | undefined;
  letterSpacing?: string | number | undefined;
  lineHeight?: string | number | undefined;
  textShadowOffset?: { width: string | number; height: string | number } | undefined;
  textShadowRadius?: string | number | undefined;
};
export type ScaleTextStyle = ScaleTextStyleIOS & ScaleViewStyle & Modify<TextStyle, ScaledTextStyle> & ViewStyle;

type ScaledImageStyle = {
  borderBottomLeftRadius?: string | number | undefined;
  borderBottomRightRadius?: string | number | undefined;
  borderWidth?: string | number | undefined;
  borderRadius?: string | number | undefined;
  borderTopLeftRadius?: string | number | undefined;
  borderTopRightRadius?: string | number | undefined;
};
export type ScaleImageStyle = ScaleFlexStyle &
  ScaleShadowStyleIOS &
  ScaleTransformsStyle &
  Modify<ImageStyle, ScaledImageStyle>;

export type ScaleThemeViewStyle = ThemeViewStyle & ScaleViewStyle;
export type ScaleThemeTextStyle = ThemeTextStyle & ScaleTextStyle;
export type ScaleThemeImageStyle = ThemeImageStyle & ScaleImageStyle;

export type MyViewStyle = ThemeViewStyle | ScaleViewStyle | ScaleThemeViewStyle | ViewStyle;
export type MyTextStyle = ThemeTextStyle | ScaleTextStyle | ScaleThemeTextStyle | TextStyle;
export type MyImageStyle = ThemeImageStyle | ScaleImageStyle | ScaleThemeImageStyle | ImageStyle;

export type OnlyThemeType = { onlyTheme?: true; onlyScale?: never };
export type OnlyScaleType = { onlyTheme?: never; onlyScale?: true };
export type StyleOption = {
  type?: ThemeType;
  device?: Partial<MediaQueryAllQueryable>;
} & (OnlyThemeType | OnlyScaleType);

export type StyleSheetOption = {
  type?: ThemeType;
  device?: Partial<MediaQueryAllQueryable>;
};
