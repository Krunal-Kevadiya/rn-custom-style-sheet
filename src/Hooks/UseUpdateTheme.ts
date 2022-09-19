import { useCallback } from 'react';

import { configs } from '../Config';
import type { AppThemeType } from '../ThemeReducers';
import { Types } from '../ThemeReducers';
import useAsyncStorage from './UseAsyncStorage';
import useThemeContext from './UseThemeContext';

export default function useUpdateMyTheme(): (appTheme: AppThemeType) => void {
  const { dispatch, getStorageString, setStorageString } = useThemeContext();
  const [, updateAppTheme] = useAsyncStorage(configs.appThemeKey, 'system', getStorageString, setStorageString);

  const handleAppTheme = useCallback((appTheme: AppThemeType) => {
    updateAppTheme(appTheme);
    dispatch({
      type: Types.ChangeAppTheme,
      payload: {
        appTheme: appTheme
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return handleAppTheme;
}
