import { useCallback } from 'react';

import {
  type ThemeContextType,
  AppThemeModeEnum,
  ReducerEventEnum,
  useThemeContext,
} from '../../../Core';
import type { UpdateThemeReturnType } from './UseUpdateThemeTypes';

export const StorageKeys = {
  AppThemeNameKey: 'appThemeNameKey',
  AppThemeModeKey: 'appThemeModeKey',
  SystemThemeModeKey: 'systemThemeModeKey',
};

export default function useUpdateTheme(): UpdateThemeReturnType {
  const { dispatch, storage }: ThemeContextType = useThemeContext();

  const handleAppTheme = useCallback<
    (appThemeName?: string, appThemeMode?: AppThemeModeEnum) => void
  >(
    (appThemeName?: string, appThemeMode?: AppThemeModeEnum) => {
      if (appThemeName !== undefined) {
        storage?.setStorage(StorageKeys.AppThemeNameKey, appThemeName);
      }
      if (appThemeMode !== undefined) {
        storage?.setStorage(StorageKeys.AppThemeModeKey, appThemeMode);
      }
      if (appThemeName !== undefined || appThemeMode !== undefined) {
        dispatch({
          type: ReducerEventEnum.ChangeAppTheme,
          payload: {
            appThemeName: appThemeName,
            appThemeMode: appThemeMode,
          },
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return handleAppTheme;
}
