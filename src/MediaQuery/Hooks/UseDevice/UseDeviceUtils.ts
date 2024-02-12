import hyphenate from 'hyphenate-style-name';
import {
  type ScaledSize,
  Appearance,
  Dimensions,
  I18nManager,
  Platform,
  PixelRatio,
} from 'react-native';

import { OrientationEnum, ThemeModeEnum } from '../../../Core';
import type {
  MediaQueryAllQueryable,
  MediaQueryMatchers,
} from '../../Components';
import type { HyphenateKeyTypes } from '../UseDevice';

export function getMatchObject(): MediaQueryMatchers {
  const window: ScaledSize = Dimensions.get('window');
  const screen: ScaledSize = Dimensions.get('screen');
  const { isRTL } = I18nManager;
  const orientation: OrientationEnum =
    window.width < window.height
      ? OrientationEnum.Portrait
      : OrientationEnum.Landscape;
  const windowWidth: number = window.width;
  const windowHeight: number = window.height;
  const screenWidth: number = screen.width;
  const screenHeight: number = screen.height;

  return {
    width: windowWidth,
    height: windowHeight,
    orientation: orientation,
    aspectRatio: windowWidth / windowHeight,
    deviceWidth: screenWidth,
    deviceHeight: screenHeight,
    deviceAspectRatio: screenWidth / screenHeight,
    pixelRatio: PixelRatio.get(),
    type: Platform.isTV ? 'tv' : Platform.OS,
    direction: isRTL ? 'rtl' : 'ltr',
    prefersColorScheme:
      Appearance.getColorScheme() === ThemeModeEnum.Dark
        ? ThemeModeEnum.Dark
        : ThemeModeEnum.Light,
  };
}

export function hyphenateKeys(
  obj?: HyphenateKeyTypes
): HyphenateKeyTypes | undefined {
  type K = keyof HyphenateKeyTypes;

  if (!obj) return undefined;
  const keys = Object.keys(obj) as K[];

  return keys.reduce((result, key) => {
    result[hyphenate(key)] = obj[key];
    return result;
  }, {} as Record<string, (typeof obj)[K]>);
}

export function getDevice(
  deviceFromProps?: MediaQueryMatchers,
  deviceFromContext?: Partial<MediaQueryAllQueryable>
): HyphenateKeyTypes {
  const result =
    hyphenateKeys(deviceFromProps) ??
    hyphenateKeys(deviceFromContext) ??
    hyphenateKeys(getMatchObject());
  return result ?? {};
}

export function shallowEqualObjects(objA: any | unknown, objB: any | unknown) {
  if (objA === objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  const aKeys: string[] = Object.keys(objA);
  const bKeys: string[] = Object.keys(objB);
  const len: number = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  for (let i: number = 0; i < len; i++) {
    const key: string | undefined = aKeys[i];

    if (
      key &&
      (objA[key] !== objB[key] ||
        !Object.prototype.hasOwnProperty.call(objB, key))
    ) {
      return false;
    }
  }

  return true;
}
