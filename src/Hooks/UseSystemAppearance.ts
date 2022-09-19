import type { Dispatch } from 'react';
import { Appearance, NativeEventSubscription } from 'react-native';

import { configs, GetStorageStringType, SetStorageStringType } from '../Config';
import type { AppThemeType, OrientationType, ThemeActions } from '../ThemeReducers';
import { Types } from '../ThemeReducers';
import useAsyncStorage from './UseAsyncStorage';
import { getWindowOrientation } from './UseDeviceOrientation';
import useDidMount from './UseDidMount';

export default function useSystemAppearance(
  dispatch: Dispatch<ThemeActions>,
  getStorageString: GetStorageStringType,
  setStorageString: SetStorageStringType,
  isSupportedOrientation: boolean
): void {
  const [, updateSystemTheme] = useAsyncStorage(configs.systemThemeKey, 'system', getStorageString, setStorageString);

  useDidMount(() => {
    function onThemeChange({ colorScheme }: Appearance.AppearancePreferences): void {
      const currentTheme = colorScheme === 'dark' ? 'dark' : 'light';
      updateSystemTheme(currentTheme);
      dispatch({
        type: Types.ChangeSystemTheme,
        payload: {
          systemTheme: currentTheme
        }
      });
    }

    const localAppTheme = getStorageString<string>(configs.appThemeKey, 'system');
    const localSystemTheme = getStorageString<string>(configs.systemThemeKey, 'system');
    dispatch({
      type: Types.Initial,
      payload: {
        appTheme: localAppTheme as AppThemeType,
        systemTheme: localSystemTheme as AppThemeType,
        orientation: isSupportedOrientation ? (getWindowOrientation() as OrientationType) : 'portrait',
        isThemeSupportedOrientation: isSupportedOrientation,
        isRefreshConfig: false
      }
    });
    const subscription: NativeEventSubscription = Appearance.addChangeListener(onThemeChange);
    return () => {
      subscription.remove();
    };
  });
}
