import type { Dispatch } from 'react';
import { useEffect } from 'react';
import type { EmitterSubscription } from 'react-native';

import { type ThemeActions, ReducerEventEnum } from '../../Reducer';
import {
  type GetScreenResolutionReturnType,
  listenOrientationChange,
  removeOrientationListener,
} from './UseDeviceOrientationUtils';
import {
  type BreakPointType,
  getCurrentBreakpointIndex,
} from '../../../BreakPoint';
import { getGeneralScreenResolution } from '../UseGeneralScreenResolution';
import type { BaseSizeLayoutType, GuideLineLayoutType } from '../../Provider';

export default function useDeviceOrientation(
  dispatch: Dispatch<ThemeActions>,
  isSupportedOrientation: boolean,
  values: BreakPointType,
  withPortraitBehaviorInLandscapeMode: boolean,
  guideLineLayout: GuideLineLayoutType,
  baseSizeLayout?: Partial<BaseSizeLayoutType>
): void {
  useEffect(() => {
    let subscription: EmitterSubscription | undefined;
    if (isSupportedOrientation) {
      subscription = listenOrientationChange(
        withPortraitBehaviorInLandscapeMode,
        (screenConfig: GetScreenResolutionReturnType) => {
          dispatch({
            type: ReducerEventEnum.ChangeResolution,
            payload: {
              currentBreakpointIndex: getCurrentBreakpointIndex(
                values,
                screenConfig.screenResolution.windowWidth
              ),
              orientation: screenConfig.orientation,
              screenResolution: screenConfig.screenResolution,
              generalScreenResolution: getGeneralScreenResolution(
                screenConfig.screenResolution,
                guideLineLayout,
                baseSizeLayout
              ),
            },
          });
        }
      );
    }
    return () => {
      removeOrientationListener(subscription);
      subscription = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupportedOrientation, values, guideLineLayout, baseSizeLayout]);
}
