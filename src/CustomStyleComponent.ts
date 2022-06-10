import React, {
  ComponentProps,
  ComponentType,
  createElement,
  forwardRef,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useMemo
} from 'react';
import { ImageStyle, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useMyCurrentTheme } from './Hooks';
import {
  CustomImageMeStyle,
  CustomImageStyle,
  CustomTextMeStyle,
  CustomTextStyle,
  CustomViewMeStyle,
  CustomViewStyle,
  deepMap,
  ImageStyleMe,
  scaleFunc,
  TextStyleMe,
  ThemeType,
  ViewStyleMe
} from './Utility';

type DefaultProps = object & {
  as?: ComponentType<any>;
  children?: ReactNode;
};

type Merge<P1 = {}, P2 = {}> = Omit<P1, keyof P2> & P2;

type ForwardRefExoticComponent<E, OwnProps> = React.ForwardRefExoticComponent<
  Merge<E extends React.ElementType ? React.ComponentPropsWithRef<E> : never, OwnProps & { as?: E }>
>;

interface Polymorphic<IntrinsicElement extends JSXElementConstructor<any>, OwnProps = {}>
  extends ForwardRefExoticComponent<IntrinsicElement, OwnProps> {
  <As extends JSXElementConstructor<any> | undefined>(
    props: As extends JSXElementConstructor<infer E>
      ? Merge<E, OwnProps & { as?: As; ref?: As }>
      : Merge<ComponentProps<IntrinsicElement>, OwnProps>
  ): ReactElement | null;
}

type NamedThemeStyles = CustomImageStyle | CustomTextStyle | CustomViewStyle | ImageStyle | TextStyle | ViewStyle;

type NamedScaleStyles = ImageStyleMe | TextStyleMe | ViewStyleMe | ImageStyle | TextStyle | ViewStyle;

type NamedScaleThemeStyles =
  | CustomImageMeStyle
  | CustomTextMeStyle
  | CustomViewMeStyle
  | ImageStyle
  | TextStyle
  | ViewStyle;

type ReturnNamedStyles = ViewStyle | TextStyle | ImageStyle;

type StylesWithTheme<P, T, U> = (args: { props: P; type?: U extends number ? never : ThemeType }) => T;

type Styles<P, T, U> = StylesWithTheme<P, T, U> | T;

export const styleTheme =
  <Comp extends ComponentType<any>>(Component: Comp) =>
  <Props extends DefaultProps = DefaultProps>(
    stylesProp: Styles<Props, NamedThemeStyles, boolean>
  ): Polymorphic<Comp, Props> => {
    return forwardRef(function ForwardedComponent(props: Props, ref) {
      const type: ThemeType = useMyCurrentTheme();
      const {
        style: inlineStyles = {},
        as,
        ...restProps
      } = props as Props & {
        style: StyleProp<NamedThemeStyles>;
      };

      // Check type of argument
      const styleSheet = typeof stylesProp === 'function' ? stylesProp({ props, type }) : stylesProp;
      const styles = useMemo<ReturnNamedStyles>(
        () =>
          deepMap(
            StyleSheet.flatten([styleSheet, ...(Array.isArray(inlineStyles) ? inlineStyles : [inlineStyles])]),
            type,
            undefined
          ),
        [styleSheet, inlineStyles, type]
      );

      // Create component
      return createElement<DefaultProps>(as || Component, {
        ...restProps,
        ref,
        style: styles
      });
    }) as any;
  };

export const styleScaled =
  <Comp extends ComponentType<any>>(Component: Comp) =>
  <Props extends DefaultProps = DefaultProps>(
    stylesProp: Styles<Props, NamedScaleStyles, number>
  ): Polymorphic<Comp, Props> => {
    return forwardRef(function ForwardedComponent(props: Props, ref) {
      const {
        style: inlineStyles = {},
        as,
        ...restProps
      } = props as Props & {
        style: StyleProp<NamedScaleStyles>;
      };

      // Check type of argument
      const styleSheet = typeof stylesProp === 'function' ? stylesProp({ props }) : stylesProp;
      const styles = useMemo<ReturnNamedStyles>(
        () =>
          deepMap(
            StyleSheet.flatten([styleSheet, ...(Array.isArray(inlineStyles) ? inlineStyles : [inlineStyles])]),
            undefined,
            scaleFunc
          ),
        [styleSheet, inlineStyles]
      );

      // Create component
      return createElement<DefaultProps>(as || Component, {
        ...restProps,
        ref,
        style: styles
      });
    }) as any;
  };

export const styleScaledTheme =
  <Comp extends ComponentType<any>>(Component: Comp) =>
  <Props extends DefaultProps = DefaultProps>(
    stylesProp: Styles<Props, NamedScaleThemeStyles, boolean>
  ): Polymorphic<Comp, Props> => {
    return forwardRef(function ForwardedComponent(props: Props, ref) {
      const type: ThemeType = useMyCurrentTheme();
      const {
        style: inlineStyles = {},
        as,
        ...restProps
      } = props as Props & {
        style: StyleProp<NamedScaleThemeStyles>;
      };

      // Check type of argument
      const styleSheet = typeof stylesProp === 'function' ? stylesProp({ props, type }) : stylesProp;
      const styles = useMemo<ReturnNamedStyles>(
        () =>
          deepMap(
            StyleSheet.flatten([styleSheet, ...(Array.isArray(inlineStyles) ? inlineStyles : [inlineStyles])]),
            type,
            scaleFunc
          ),
        [styleSheet, inlineStyles, type]
      );

      // Create component
      return createElement<DefaultProps>(as || Component, {
        ...restProps,
        ref,
        style: styles
      });
    }) as any;
  };
