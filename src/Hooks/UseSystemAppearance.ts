import type { Dispatch } from 'react';
import { Appearance, NativeEventSubscription } from 'react-native';

import { listenOrientationChange, removeOrientationListener } from '../Utility';
import type { AppThemeType, OrientationType, ThemeActions } from './ThemeReducers';
import { Types } from './ThemeReducers';
import useAsyncStorage from './UseAsyncStorage';
import useDidMount from './UseDidMount';

export default function useSystemAppearance(dispatch: Dispatch<ThemeActions>): void {
  const [appTheme] = useAsyncStorage<string>('appTheme', 'system');
  const [systemTheme, updateSystemTheme] = useAsyncStorage<string>('systemTheme', 'system');

  useDidMount(() => {
    function onThemeChange({ colorScheme }: Appearance.AppearancePreferences): void {
      const currentType = colorScheme === 'dark' ? 'dark' : 'light';
      updateSystemTheme(currentType);
      dispatch({
        type: Types.ChangeSystemTheme,
        payload: {
          systemTheme: currentType
        }
      });
    }

    dispatch({
      type: Types.Initial,
      payload: {
        appTheme: appTheme as AppThemeType,
        systemTheme: systemTheme as AppThemeType,
        orientation: 'portrait'
      }
    });
    const subscription: NativeEventSubscription = Appearance.addChangeListener(onThemeChange);
    listenOrientationChange((orientation: string) => {
      dispatch({
        type: Types.ChangeOrientation,
        payload: {
          orientation: orientation as OrientationType
        }
      });
    });

    return () => {
      subscription.remove();
      removeOrientationListener();
    };
  });
}
