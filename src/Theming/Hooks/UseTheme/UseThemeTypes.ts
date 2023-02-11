import type { StyleSheetOption, ThemeModeEnum } from '../../../Core';

export type UseThemeReturnType<T> = {
  styles: T;
  themeName: string;
  themeMode: ThemeModeEnum;
  isDark: boolean;
  isPortrait: boolean;
};

export type StyleSheetPropsType = Omit<StyleSheetOption, 'isDisableScaling'>;
