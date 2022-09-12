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

import { useCurrentTheme } from './Hooks';
import useCurrentOrientation from './Hooks/UseCurrentOrientation';
import type { MediaQueryAllQueryable } from './MediaQuery';
import type { OrientationType } from './ThemeReducers';
import {
  deepMap,
  OnlyScaleType,
  OnlyThemeType,
  scaleFunc,
  ScaleImageStyle,
  ScaleTextStyle,
  ScaleThemeImageStyle,
  ScaleThemeTextStyle,
  ScaleThemeViewStyle,
  ScaleViewStyle,
  ThemeImageStyle,
  ThemeTextStyle,
  ThemeType,
  ThemeViewStyle
} from './Utility';

type DefaultProps = object & {
  as?: ComponentType<any>;
  children?: ReactNode;
  device?: Partial<MediaQueryAllQueryable>;
} & (OnlyThemeType | OnlyScaleType);

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

type Get<T, K> = K extends `${infer F}.${infer R}`
  ? F extends keyof T
    ? Get<T[F], R>
    : never
  : K extends keyof T
  ? T[K]
  : never;

type BoundMediaStyles<T> = {
  [P in keyof T]:
    | Get<ThemeViewStyle, P>
    | Get<ThemeTextStyle, P>
    | Get<ThemeImageStyle, P>
    | Get<ScaleViewStyle, P>
    | Get<ScaleTextStyle, P>
    | Get<ScaleImageStyle, P>
    | Get<ScaleThemeViewStyle, P>
    | Get<ScaleThemeTextStyle, P>
    | Get<ScaleThemeImageStyle, P>;
};
type BoundStyles<P> = P extends object
  ? BoundMediaStyles<keyof P>
  :
      | Get<ThemeViewStyle, P>
      | Get<ThemeTextStyle, P>
      | Get<ThemeImageStyle, P>
      | Get<ScaleViewStyle, P>
      | Get<ScaleTextStyle, P>
      | Get<ScaleImageStyle, P>
      | Get<ScaleThemeViewStyle, P>
      | Get<ScaleThemeTextStyle, P>
      | Get<ScaleThemeImageStyle, P>;

export const styleComp =
  <Comp extends ComponentType<any>>(Component: Comp) =>
  <Props extends DefaultProps = DefaultProps>(
    stylesProp: BoundStyles<any> | ((args: { props: Props; theme: ThemeType }) => BoundStyles<any>)
  ): Polymorphic<Comp, Props> => {
    return forwardRef(function ForwardedComponent(props: Props, ref) {
      const {
        style: inlineStyles = {},
        as,
        device,
        onlyTheme,
        onlyScale,
        ...restProps
      } = props as Props & {
        style: StyleProp<BoundStyles<any>>;
      };
      const localOnlyTheme: boolean = onlyTheme ?? false;
      const localScaleTheme: boolean = onlyScale ?? false;
      const localDevice: Partial<MediaQueryAllQueryable> | undefined = device;
      const localTheme: ThemeType = useCurrentTheme();
      const orientation: OrientationType = useCurrentOrientation();

      // Check type of argument
      const styleSheet = typeof stylesProp === 'function' ? stylesProp({ props, theme: localTheme }) : stylesProp;
      const styles = useMemo<ViewStyle | TextStyle | ImageStyle>(
        () =>
          deepMap({
            styles: StyleSheet.flatten([styleSheet, ...(Array.isArray(inlineStyles) ? inlineStyles : [inlineStyles])]),
            device: localDevice,
            theme: localScaleTheme ? undefined : localTheme,
            scaleFunc: localOnlyTheme ? undefined : scaleFunc
          }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [styleSheet, inlineStyles, device, localTheme, orientation]
      );

      // Create component
      return createElement<DefaultProps>(as || Component, {
        ...restProps,
        ref,
        style: styles
      });
    }) as any;
  };
