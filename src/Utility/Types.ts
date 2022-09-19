import type { ColorValue, ImageStyle, TextStyle, ViewStyle } from 'react-native';

import type { MediaQueryAllQueryable } from '../MediaQuery';

// Theme
type ThemeStyle = {
  backgroundColorDark?: ColorValue | undefined;
  borderBottomColorDark?: ColorValue | undefined;
  borderColorDark?: ColorValue | undefined;
  borderEndColorDark?: ColorValue | undefined;
  borderLeftColorDark?: ColorValue | undefined;
  borderRightColorDark?: ColorValue | undefined;
  borderStartColorDark?: ColorValue | undefined;
  borderTopColorDark?: ColorValue | undefined;
  shadowColorDark?: ColorValue | undefined;
  colorDark: ColorValue | undefined;
  textShadowColorDark?: ColorValue | undefined;
  textDecorationColorDark?: ColorValue | undefined;
  overlayColorDark?: ColorValue | undefined;
  tintColorDark?: ColorValue | undefined;
};

// Scale
type ScaleStyle = {
  borderBottomWidth?: string | number | undefined;
  borderEndWidth?: number | string | undefined;
  borderLeftWidth?: string | number | undefined;
  borderRightWidth?: string | number | undefined;
  borderStartWidth?: number | string | undefined;
  borderTopWidth?: string | number | undefined;
  borderWidth?: string | number | undefined;
  shadowOffset?: { width: string | number; height: string | number } | undefined;
  shadowRadius?: string | number | undefined;
  transform?:
    | (
        | {
            translateX: string | number;
          }
        | {
            translateY: string | number;
          }
      )[]
    | undefined;
  translateX?: string | number | undefined;
  translateY?: string | number | undefined;
  borderBottomEndRadius?: string | number | undefined;
  borderBottomLeftRadius?: string | number | undefined;
  borderBottomRightRadius?: string | number | undefined;
  borderBottomStartRadius?: string | number | undefined;
  borderRadius?: string | number | undefined;
  borderTopEndRadius?: string | number | undefined;
  borderTopLeftRadius?: string | number | undefined;
  borderTopRightRadius?: string | number | undefined;
  borderTopStartRadius?: string | number | undefined;
  elevation?: string | number | undefined;
  letterSpacing?: string | number | undefined;
  fontSize?: string | number | undefined;
  lineHeight?: string | number | undefined;
  textShadowOffset?: { width: string | number; height: string | number } | undefined;
  textShadowRadius?: string | number | undefined;
};

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type EndsWith<T, U extends string> = T extends `${infer Rest}${U}` ? never : T;

type RemoveType<V> = V extends Record<string, any> | undefined
  ? {
      [K in keyof V]: number | undefined;
    }
  : number | undefined;
type RemoveArrayType<T extends any[]> = T extends [...infer R, infer E] ? [RemoveType<E>, ...RemoveArrayType<R>] : T;
// @ts-ignore
type RemoveObjectAndArrayType<V> = V extends Record<string, any>[] | undefined ? RemoveArrayType<V> : RemoveType<V>;

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
type Includes<T extends unknown[], U, V> = T extends [infer First, ...infer Rest]
  ? Equal<First, U> extends true
    ? RemoveObjectAndArrayType<V>
    : Includes<Rest, U, V>
  : V;

type FilterExtraKeyWithActualKey<T, B extends unknown[]> = {
  [K in keyof T as EndsWith<K, 'Dark'>]: Includes<B, K, T[K]>;
};

export type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle | Record<string, any> };

// Currently not used anymore
export type ReturnStyles<T> = {
  [K in keyof T]:
    | FilterExtraKeyWithActualKey<
        T[K],
        [
          'borderBottomWidth',
          'borderEndWidth',
          'borderLeftWidth',
          'borderRightWidth',
          'borderStartWidth',
          'borderTopWidth',
          'borderWidth',
          'shadowOffset',
          'shadowRadius',
          'transform',
          'translateX',
          'translateY',
          'borderBottomEndRadius',
          'borderBottomLeftRadius',
          'borderBottomRightRadius',
          'borderBottomStartRadius',
          'borderRadius',
          'borderTopEndRadius',
          'borderTopLeftRadius',
          'borderTopRightRadius',
          'borderTopStartRadius',
          'elevation',
          'letterSpacing',
          'fontSize',
          'lineHeight',
          'textShadowOffset',
          'textShadowRadius'
        ]
      >
    | ViewStyle
    | TextStyle
    | ImageStyle;
};

type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;

type ThemeStyleType =
  | ViewStyle
  | TextStyle
  | ImageStyle
  | Modify<ViewStyle, ThemeStyle>
  | Modify<TextStyle, ThemeStyle>
  | Modify<ImageStyle, ThemeStyle>
  | Modify<ViewStyle, ScaleStyle>
  | Modify<TextStyle, ScaleStyle>
  | Modify<ImageStyle, ScaleStyle>;

type MediaQueryType<V> = V extends Record<string, any> | undefined
  ? {
      [K in keyof V]: ThemeStyleType;
    }
  : ThemeStyleType;

export type BoundStyles<T> = {
  [P in keyof T]: MediaQueryType<T[P]>;
};

// Style sheet options
export type ThemeType = 'light' | 'dark';
export type OnlyThemeType = { onlyTheme?: true; onlyScale?: never };
export type OnlyScaleType = { onlyTheme?: never; onlyScale?: true };
export type StyleOption = {
  theme: ThemeType;
  device?: Partial<MediaQueryAllQueryable>;
} & (OnlyThemeType | OnlyScaleType);

export type StyleSheetOption = {
  theme: ThemeType;
  device?: Partial<MediaQueryAllQueryable>;
};
