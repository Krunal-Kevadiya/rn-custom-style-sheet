import type { Dispatch } from 'react';
import { type NativeEventSubscription, Appearance } from 'react-native';

import { StorageKeys } from '../../../Theming';
import {
  type ThemeActions,
  AppThemeModeEnum,
  ReducerEventEnum,
} from '../../Reducer';
import { useDidMount } from '../UseDidMount';
import type { GuideLineStorageType } from '../../Provider';

export default function useSystemAppearance(
  dispatch: Dispatch<ThemeActions>,
  storage: GuideLineStorageType
): void {
  useDidMount(() => {
    function onThemeChange({
      colorScheme,
    }: Appearance.AppearancePreferences): void {
      const currentTheme =
        colorScheme === AppThemeModeEnum.Dark
          ? AppThemeModeEnum.Dark
          : AppThemeModeEnum.Light;
      storage.setStorage(StorageKeys.SystemThemeModeKey, currentTheme);
      dispatch({
        type: ReducerEventEnum.ChangeSystemThemeMode,
        payload: {
          systemThemeMode: currentTheme,
        },
      });
    }
    const subscription: NativeEventSubscription =
      Appearance.addChangeListener(onThemeChange);
    return () => {
      subscription.remove();
    };
  });
}
