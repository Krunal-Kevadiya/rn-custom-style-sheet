import type { Animated } from 'react-native';
import type { BreakPointValueType } from '../../../BreakPoint';

const shortHandLayoutProperties = {
  w: ['width'],
  h: ['height'],
  minW: ['minWidth'],
  minH: ['minHeight'],
  maxW: ['maxWidth'],
  maxH: ['maxHeight'],
  size: ['width', 'height'],
  minSize: ['minWidth', 'minHeight'],
  maxSize: ['maxWidth', 'maxHeight'],
};
const shortHandSpaceProperties = {
  m: ['margin'],
  mt: ['marginTop'],
  mr: ['marginRight'],
  mb: ['marginBottom'],
  ml: ['marginLeft'],
  marginX: ['marginLeft', 'marginRight'],
  mx: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  my: ['marginTop', 'marginBottom'],
  p: ['padding'],
  pt: ['paddingTop'],
  pr: ['paddingRight'],
  pb: ['paddingBottom'],
  pl: ['paddingLeft'],
  paddingX: ['paddingLeft', 'paddingRight'],
  px: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  py: ['paddingTop', 'paddingBottom'],
};
const shortHandColorProperties = {
  bg: ['backgroundColor'],
  bgColor: ['backgroundColor'],
  background: ['backgroundColor'],
  borderColorX: ['borderLeftColor', 'borderRightColor'],
  borderColorY: ['borderTopColor', 'borderBottomColor'],
};
const shortHandBorderProperties = {
  borderTopRadius: ['borderTopLeftRadius', 'borderTopRightRadius'],
  borderLeftRadius: ['borderTopLeftRadius', 'borderBottomLeftRadius'],
  borderRightRadius: ['borderTopRightRadius', 'borderBottomRightRadius'],
  borderBottomRadius: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
  rounded: ['borderRadius'],
  roundedTopLeft: ['borderTopLeftRadius'],
  roundedTopRight: ['borderTopRightRadius'],
  roundedBottomLeft: ['borderBottomLeftRadius'],
  roundedBottomRight: ['borderBottomRightRadius'],
  roundedTop: ['borderTopLeftRadius', 'borderTopRightRadius'],
  roundedLeft: ['borderTopLeftRadius', 'borderBottomLeftRadius'],
  roundedRight: ['borderTopRightRadius', 'borderBottomRightRadius'],
  roundedBottom: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
  borderWidthX: ['borderLeftWidth', 'borderRightWidth'],
  borderWidthY: ['borderTopWidth', 'borderBottomWidth'],
};
export const shortHandOtherProperties = {
  flexDir: ['flexDirection'],
  weight: ['fontWeight'],
};

export const ShortHandProperties: Record<string, string[]> = {
  ...shortHandLayoutProperties,
  ...shortHandSpaceProperties,
  ...shortHandColorProperties,
  ...shortHandBorderProperties,
  ...shortHandOtherProperties,
};

type ApplyMetricsType<T> = {
  [P in keyof T]?: MetricsType;
};

type ApplyColorType<T> = {
  [P in keyof T]?: ColorValue | undefined;
};

type ShortHandLayoutPropertiesType = ApplyMetricsType<
  typeof shortHandLayoutProperties
>;
type ShortHandSpacePropertiesType = ApplyMetricsType<
  typeof shortHandSpaceProperties
>;
type ShortHandColorPropertiesType = ApplyColorType<
  typeof shortHandColorProperties
>;
type ShortHandBorderPropertiesType = ApplyMetricsType<
  typeof shortHandBorderProperties
>;
type ShortHandOtherPropertiesType = {
  flexDir?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;
  weight?: MetricsType;
};

export type ShortHandStyle =
  | ShortHandLayoutPropertiesType
  | ShortHandSpacePropertiesType
  | ShortHandColorPropertiesType
  | ShortHandBorderPropertiesType
  | ShortHandOtherPropertiesType;

type FlexAlignType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline';

type MetricsType =
  | undefined
  | null
  | number
  | string
  | number[]
  | string[]
  | BreakPointValueType
  | Animated.AnimatedNode;

/**
 * Flex Prop Types
 * @see https://reactnative.dev/docs/flexbox#proptypes
 * @see https://reactnative.dev/docs/layout-props
 * @see https://github.com/facebook/react-native/blob/master/Libraries/StyleSheet/LayoutPropTypes.js
 */
export interface FlexStyle {
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | undefined;
  alignItems?: FlexAlignType | undefined;
  alignSelf?: 'auto' | FlexAlignType | undefined;
  aspectRatio?: number | undefined;
  borderBottomWidth?: MetricsType;
  borderEndWidth?: MetricsType;
  borderLeftWidth?: MetricsType;
  borderRightWidth?: MetricsType;
  borderStartWidth?: MetricsType;
  borderTopWidth?: MetricsType;
  borderWidth?: MetricsType;
  bottom?: MetricsType;
  display?: 'none' | 'flex' | undefined;
  end?: MetricsType;
  flex?: number | undefined;
  flexBasis?: number | string | undefined;
  flexDirection?:
    | 'row'
    | 'column'
    | 'row-reverse'
    | 'column-reverse'
    | undefined;
  flexGrow?: number | undefined;
  flexShrink?: number | undefined;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | undefined;
  height?: MetricsType;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  left?: MetricsType;
  margin?: MetricsType;
  marginBottom?: MetricsType;
  marginEnd?: MetricsType;
  marginHorizontal?: MetricsType;
  marginLeft?: MetricsType;
  marginRight?: MetricsType;
  marginStart?: MetricsType;
  marginTop?: MetricsType;
  marginVertical?: MetricsType;
  maxHeight?: MetricsType;
  maxWidth?: MetricsType;
  minHeight?: MetricsType;
  minWidth?: MetricsType;
  overflow?: 'visible' | 'hidden' | 'scroll' | undefined;
  padding?: MetricsType;
  paddingBottom?: MetricsType;
  paddingEnd?: MetricsType;
  paddingHorizontal?: MetricsType;
  paddingLeft?: MetricsType;
  paddingRight?: MetricsType;
  paddingStart?: MetricsType;
  paddingTop?: MetricsType;
  paddingVertical?: MetricsType;
  position?: 'absolute' | 'relative' | undefined;
  right?: MetricsType;
  start?: MetricsType;
  top?: MetricsType;
  width?: MetricsType;
  zIndex?: number | undefined;

  /**
   * @platform ios
   */
  direction?: 'inherit' | 'ltr' | 'rtl' | undefined;
}

type OpaqueColorValue = symbol & { __TYPE__: 'Color' };
export type ColorValue = string | OpaqueColorValue;

export interface ShadowStyleIOS {
  shadowColor?: ColorValue | undefined;
  shadowOffset?: { width: MetricsType; height: MetricsType } | undefined;
  shadowOpacity?: number | undefined;
  shadowRadius?: MetricsType;
}

interface PerpectiveTransform {
  perspective: number;
}

interface RotateTransform {
  rotate: string;
}

interface RotateXTransform {
  rotateX: string;
}

interface RotateYTransform {
  rotateY: string;
}

interface RotateZTransform {
  rotateZ: string;
}

interface ScaleTransform {
  scale: number;
}

interface ScaleXTransform {
  scaleX: number;
}

interface ScaleYTransform {
  scaleY: number;
}

interface TranslateXTransform {
  translateX: number;
}

interface TranslateYTransform {
  translateY: number;
}

interface SkewXTransform {
  skewX: string;
}

interface SkewYTransform {
  skewY: string;
}

interface MatrixTransform {
  matrix: number[];
}

export interface TransformsStyle {
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
      )[]
    | undefined;
  /**
   * @deprecated Use matrix in transform prop instead.
   */
  transformMatrix?: Array<number> | undefined;
  /**
   * @deprecated Use rotate in transform prop instead.
   */
  rotation?: number | undefined;
  /**
   * @deprecated Use scaleX in transform prop instead.
   */
  scaleX?: number | undefined;
  /**
   * @deprecated Use scaleY in transform prop instead.
   */
  scaleY?: number | undefined;
  /**
   * @deprecated Use translateX in transform prop instead.
   */
  translateX?: number | undefined;
  /**
   * @deprecated Use translateY in transform prop instead.
   */
  translateY?: number | undefined;
}

/**
 * @see https://reactnative.dev/docs/view#style
 * @see https://github.com/facebook/react-native/blob/master/Libraries/Components/View/ViewStylePropTypes.js
 */
export interface ScaleViewStyle
  extends FlexStyle,
    ShadowStyleIOS,
    TransformsStyle {
  backfaceVisibility?: 'visible' | 'hidden' | undefined;
  backgroundColor?: ColorValue | undefined;
  borderBottomColor?: ColorValue | undefined;
  borderBottomEndRadius?: MetricsType;
  borderBottomLeftRadius?: MetricsType;
  borderBottomRightRadius?: MetricsType;
  borderBottomStartRadius?: MetricsType;
  borderBottomWidth?: MetricsType;
  borderColor?: ColorValue | undefined;
  borderEndColor?: ColorValue | undefined;
  borderLeftColor?: ColorValue | undefined;
  borderLeftWidth?: MetricsType;
  borderRadius?: MetricsType;
  borderRightColor?: ColorValue | undefined;
  borderRightWidth?: MetricsType;
  borderStartColor?: ColorValue | undefined;
  borderStyle?: 'solid' | 'dotted' | 'dashed' | undefined;
  borderTopColor?: ColorValue | undefined;
  borderTopEndRadius?: MetricsType;
  borderTopLeftRadius?: MetricsType;
  borderTopRightRadius?: MetricsType;
  borderTopStartRadius?: MetricsType;
  borderTopWidth?: MetricsType;
  borderWidth?: MetricsType;
  opacity?: number | undefined;
  testID?: string | undefined;
  /**
   * Sets the elevation of a view, using Android's underlying
   * [elevation API](https://developer.android.com/training/material/shadows-clipping.html#Elevation).
   * This adds a drop shadow to the item and affects z-order for overlapping views.
   * Only supported on Android 5.0+, has no effect on earlier versions.
   *
   * @platform android
   */
  elevation?: MetricsType;
}

export type FontVariant =
  | 'small-caps'
  | 'oldstyle-nums'
  | 'lining-nums'
  | 'tabular-nums'
  | 'proportional-nums';
export interface TextStyleIOS extends ScaleViewStyle {
  fontVariant?: FontVariant[] | undefined;
  letterSpacing?: MetricsType;
  textDecorationColor?: ColorValue | undefined;
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | undefined;
  writingDirection?: 'auto' | 'ltr' | 'rtl' | undefined;
}

export interface TextStyleAndroid extends ScaleViewStyle {
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center' | undefined;
  includeFontPadding?: boolean | undefined;
}

// @see https://reactnative.dev/docs/text#style
export interface ScaleTextStyle
  extends TextStyleIOS,
    TextStyleAndroid,
    ScaleViewStyle {
  color?: ColorValue | undefined;
  fontFamily?: string | undefined;
  fontSize?: MetricsType;
  fontStyle?: 'normal' | 'italic' | undefined;
  /**
   * Specifies font weight. The values 'normal' and 'bold' are supported
   * for most fonts. Not all fonts have a variant for each of the numeric
   * values, in that case the closest one is chosen.
   */
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  letterSpacing?: MetricsType;
  lineHeight?: MetricsType;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
    | undefined;
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | undefined;
  textDecorationColor?: ColorValue | undefined;
  textShadowColor?: ColorValue | undefined;
  textShadowOffset?: { width: number; height: number } | undefined;
  textShadowRadius?: MetricsType;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined;
  testID?: string | undefined;
}

export type ImageResizeMode =
  | 'cover'
  | 'contain'
  | 'stretch'
  | 'repeat'
  | 'center';

/**
 * Image style
 * @see https://reactnative.dev/docs/image#style
 * @see https://github.com/facebook/react-native/blob/master/Libraries/Image/ImageStylePropTypes.js
 */
export interface ScaleImageStyle
  extends FlexStyle,
    ShadowStyleIOS,
    TransformsStyle {
  resizeMode?: ImageResizeMode | undefined;
  backfaceVisibility?: 'visible' | 'hidden' | undefined;
  borderBottomLeftRadius?: MetricsType;
  borderBottomRightRadius?: MetricsType;
  backgroundColor?: ColorValue | undefined;
  borderColor?: ColorValue | undefined;
  borderWidth?: MetricsType;
  borderRadius?: MetricsType;
  borderTopLeftRadius?: MetricsType;
  borderTopRightRadius?: MetricsType;
  overflow?: 'visible' | 'hidden' | undefined;
  overlayColor?: ColorValue | undefined;
  tintColor?: ColorValue | undefined;
  opacity?: number | undefined;
}
