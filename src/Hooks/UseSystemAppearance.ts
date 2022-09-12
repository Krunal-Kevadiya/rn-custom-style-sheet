import type { Dispatch } from 'react';
import { Appearance, NativeEventSubscription } from 'react-native';

import type { AppThemeType, OrientationType, ThemeActions } from '../ThemeReducers';
import { Types } from '../ThemeReducers';
import { getStorageString } from '../Utility';
import useAsyncStorage from './UseAsyncStorage';
import { getWindowOrientation } from './UseDeviceOrientation';
import useDidMount from './UseDidMount';

export default function useSystemAppearance(dispatch: Dispatch<ThemeActions>, isSupportedOrientation: boolean): void {
  const [, updateSystemTheme] = useAsyncStorage<string>('systemTheme', 'system');

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

    const localAppTheme = getStorageString<string>('appTheme', 'system');
    const localSystemTheme = getStorageString<string>('systemTheme', 'system');
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
