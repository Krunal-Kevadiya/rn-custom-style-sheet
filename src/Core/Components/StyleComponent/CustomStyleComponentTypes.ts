import type { ReactNode } from 'react';
import type { StyleProp } from 'react-native';
import type { MediaQueryAllQueryable } from '../../../MediaQuery';
import type { ThemeModeEnum } from '../../Reducer';
import type { ThemeStyleType, MediaQueryItemType } from '../CustomStyleSheet';

export type CommonProps = {
  device?: Partial<MediaQueryAllQueryable>;
  isDisableScaling?: boolean;
};

export type StyledComponentProps<Component = unknown> = StyleProp<Component> &
  ThemeStyleType &
  CommonProps;

export type StyledOptions<StyledCompProps> = {
  attrs?: StyledCompProps;
  children?: ReactNode | undefined;
};

export type StyleComponentOption = {
  isDark: boolean;
  themeName: string;
  themeMode: ThemeModeEnum;
};

export type StyledComponentFnProps<StyledCompProps> = StyledCompProps & {
  styleOption: StyleComponentOption;
};

export type ComponentProps<Component = unknown> = {
  style?: StyleProp<Component>;
  // children?: ReactNode;
} & CommonProps;

export type CustomStyledComponentProps<Component = unknown> =
  StyleProp<Component> & ThemeStyleType & MediaQueryItemType;
