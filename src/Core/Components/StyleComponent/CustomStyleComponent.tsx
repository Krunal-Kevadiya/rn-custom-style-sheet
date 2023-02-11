import React, { useMemo } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type {
  ComponentProps,
  StyledOptions,
  StyledComponentProps,
  StyledComponentFnProps,
  CustomStyledComponentProps,
} from './CustomStyleComponentTypes';
import {
  type GuideLineLayoutType,
  type ScreenResolutionType,
  type StateGuideLineBreakpointType,
  ThemeModeEnum,
  useGuideLineBreakpoint,
  useGuideLineLayout,
  useScreenResolution,
  useCurrentBreakpointIndex,
  useGeneralScreenResolution,
  type GeneralScreenResolutionType,
} from '../..';
import { type MediaQueryAllQueryable, useDevice } from '../../../MediaQuery';
import { styleProcess, scaleFunc } from '../../../Scaling';
import type { NamedStyles } from '../CustomStyleSheet';
import { useCurrentThemeMode, useCurrentThemeName } from '../../../Theming';

export const styled =
  <P extends ComponentProps>(
    Component: React.ComponentType<P & StyledComponentProps>
  ) =>
  (
    style:
      | CustomStyledComponentProps
      | ((
          props: StyledComponentFnProps<StyledComponentProps>
        ) => CustomStyledComponentProps),
    options?: StyledOptions<StyledComponentProps>
  ) => {
    const { attrs, children } = options || {};

    return (props: P & StyledComponentProps) => {
      const {
        device,
        isDisableScaling,
        style: inlineStyles,
        ...restProps
      } = props;

      const localIsDisableScaling: boolean = isDisableScaling ?? false;
      const localAppThemeName: string = useCurrentThemeName();
      const localThemeMode: ThemeModeEnum = useCurrentThemeMode();
      const localDevice: Partial<MediaQueryAllQueryable> = useDevice(device);
      const localScreenResolution: ScreenResolutionType = useScreenResolution();
      const localGeneralScreenResolution: GeneralScreenResolutionType =
        useGeneralScreenResolution();
      const localGuideLineLayout: GuideLineLayoutType = useGuideLineLayout();
      const localGuideLineBreakpoint: StateGuideLineBreakpointType =
        useGuideLineBreakpoint();
      const localCurrentBreakpointIndex: number = useCurrentBreakpointIndex();

      const isDark: boolean = localThemeMode === 'dark';

      const StyledProps = {
        ...(restProps as Record<string, unknown>),
        styleOption: {
          themeMode: localThemeMode,
          themeName: localAppThemeName,
          isDark,
        },
      } as StyledComponentFnProps<StyledComponentProps>;

      const computedStyles =
        style instanceof Function ? style(StyledProps) : style;

      const styles: NamedStyles<any> = useMemo<NamedStyles<any>>(() => {
        const newStyles = Array.isArray(computedStyles)
          ? [...computedStyles, inlineStyles]
          : [computedStyles, inlineStyles];
        return styleProcess({
          // @ts-ignore
          styles: StyleSheet.flatten(newStyles),
          device: localDevice,
          guideLineBreakpoint: localGuideLineBreakpoint,
          scaleFunc: localIsDisableScaling
            ? undefined
            : scaleFunc(
                localScreenResolution,
                localGuideLineLayout,
                localGuideLineBreakpoint,
                localGeneralScreenResolution,
                localCurrentBreakpointIndex
              ),
        }) as NamedStyles<any>;
      }, [
        inlineStyles,
        computedStyles,
        localDevice,
        localGuideLineBreakpoint,
        localIsDisableScaling,
        localScreenResolution,
        localGuideLineLayout,
        localCurrentBreakpointIndex,
        localGeneralScreenResolution,
      ]);

      const computedProps = {
        ...(props as Record<string, unknown>),
        ...(attrs || {}),
      } as P;

      Component.displayName = Component.displayName || Component.name;

      if (children) {
        return (
          <Component {...computedProps} style={styles}>
            {children}
          </Component>
        );
      } else {
        return <Component {...computedProps} style={styles} />;
      }
    };
  };

styled.SafeAreaView = styled(SafeAreaView);
styled.View = styled(View);
styled.Text = styled(Text);
styled.TextInput = styled(TextInput);
styled.Image = styled(Image);
styled.FlatList = styled(FlatList);
styled.ScrollView = styled(ScrollView);
styled.SectionList = styled(SectionList);
styled.TouchableOpacity = styled(TouchableOpacity);
