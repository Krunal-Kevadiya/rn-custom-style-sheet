import hyphenate from 'hyphenate-style-name';
import { useEffect, useState } from 'react';
import { Appearance, Dimensions, EmitterSubscription, I18nManager, Platform, ScaledSize } from 'react-native';

import { useDeepCompareEffect } from '../../Hooks';
import { listenOrientationChange, removeOrientationListener, shallowEqualObjects } from '../../Utility';
import type { MediaQueryAllQueryable, MediaQueryMatchers } from '../Types';
import useDeviceForMediaQuery from './UseDeviceForMediaQuery';
import useIsUpdate from './UseIsUpdate';
import useLandscapeSupportedMediaQuery from './UseLandscapeSupportedMediaQuery';

type HyphenateKeyTypes = MediaQueryMatchers | MediaQueryAllQueryable;

function getMatchObject(): MediaQueryMatchers {
  const window: ScaledSize = Dimensions.get('window');
  const screen: ScaledSize = Dimensions.get('screen');
  const { isRTL } = I18nManager;
  return {
    width: window.width,
    height: window.height,
    orientation: window.width > window.height ? 'landscape' : 'portrait',
    aspectRatio: window.width / window.height,
    deviceHeight: screen.height,
    deviceWidth: screen.width,
    deviceAspectRatio: screen.width / screen.height,
    type: Platform.isTV ? 'tv' : Platform.OS,
    direction: isRTL ? 'rtl' : 'ltr',
    prefersColorScheme: Appearance.getColorScheme() || 'light'
  };
}

function hyphenateKeys(obj?: HyphenateKeyTypes): HyphenateKeyTypes | undefined {
  type K = keyof HyphenateKeyTypes;

  if (!obj) return undefined;
  const keys = Object.keys(obj) as K[];

  return keys.reduce((result, key) => {
    result[hyphenate(key)] = obj[key];
    return result;
  }, {} as Record<string, typeof obj[K]>);
}

export default function useDevice(deviceFromProps?: MediaQueryMatchers): Partial<MediaQueryAllQueryable> {
  const deviceFromContext = useDeviceForMediaQuery();
  const isLandscape = useLandscapeSupportedMediaQuery();
  function getDevice(): HyphenateKeyTypes {
    const result =
      hyphenateKeys(deviceFromProps) || hyphenateKeys(deviceFromContext) || hyphenateKeys(getMatchObject());
    return result ?? {};
  }
  const [device, setDevice] = useState<HyphenateKeyTypes>(getDevice);
  const isUpdate = useIsUpdate();

  useDeepCompareEffect(() => {
    if (isUpdate) {
      const newDevice: HyphenateKeyTypes = getDevice();
      if (!shallowEqualObjects(device, newDevice)) {
        setDevice(newDevice);
      }
    }
  }, [deviceFromProps, deviceFromContext]);

  useEffect(() => {
    let subscription: EmitterSubscription | undefined;
    if (isLandscape) {
      subscription = listenOrientationChange(false, () => {
        const newDevice: HyphenateKeyTypes = getDevice();
        setDevice(newDevice);
      });
    }
    return () => {
      removeOrientationListener(subscription);
      subscription = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLandscape]);

  return device;
}
