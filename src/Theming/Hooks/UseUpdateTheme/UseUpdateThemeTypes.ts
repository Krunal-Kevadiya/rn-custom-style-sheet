import type { AppThemeModeEnum } from '../../../Core';

export type UpdateThemeReturnType = (
  appThemeName?: string,
  appThemeMode?: AppThemeModeEnum
) => void;
