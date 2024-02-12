import { useEffect, useState } from 'react';

import {
  OrientationEnum,
  useCurrentOrientation,
  useDeepCompareEffect,
} from '../../../Core';
import type {
  MediaQueryAllQueryable,
  MediaQueryMatchers,
} from '../../Components';
import { useDeviceForMediaQuery } from '../UseDeviceForMediaQuery';
import { useIsUpdate } from '../UseIsUpdate';
import type { HyphenateKeyTypes } from './UseDeviceTypes';
import { getDevice, shallowEqualObjects } from './UseDeviceUtils';

export default function useDevice(
  deviceFromProps?: MediaQueryMatchers
): Partial<MediaQueryAllQueryable> {
  const deviceFromContext: Partial<MediaQueryAllQueryable> | undefined =
    useDeviceForMediaQuery();
  const isSupportedOrientation: OrientationEnum = useCurrentOrientation();

  const [device, setDevice] = useState<HyphenateKeyTypes>(
    getDevice(deviceFromProps, deviceFromContext)
  );
  const isUpdate: boolean = useIsUpdate();

  useDeepCompareEffect(() => {
    if (isUpdate) {
      const newDevice: HyphenateKeyTypes = getDevice(
        deviceFromProps,
        deviceFromContext
      );
      if (!shallowEqualObjects(device, newDevice)) {
        setDevice(newDevice);
      }
    }
  }, [deviceFromProps, deviceFromContext]);

  useEffect(() => {
    const newDevice: HyphenateKeyTypes = getDevice(
      deviceFromProps,
      deviceFromContext
    );
    if (!shallowEqualObjects(device, newDevice)) {
      setDevice(newDevice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupportedOrientation]);

  return device;
}
