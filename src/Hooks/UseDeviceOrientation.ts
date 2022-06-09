import type { Dispatch } from 'react';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';

import type { OrientationType, ThemeActions } from '../ThemeReducers';
import { Types } from '../ThemeReducers';
import { listenOrientationChange, removeOrientationListener } from '../Utility';

export const ORIENTATION = {
  LANDSCAPE: 'landscape',
  PORTRAIT: 'portrait'
};

export function getWindowOrientation(): string {
  const { width, height } = Dimensions.get('window');
  return height >= width ? ORIENTATION.PORTRAIT : ORIENTATION.LANDSCAPE;
}

export default function useDeviceOrientation(dispatch: Dispatch<ThemeActions>, isSupportLandscape: boolean): void {
  useEffect(() => {
    if (isSupportLandscape) {
      listenOrientationChange((orientation: string) => {
        dispatch({
          type: Types.ChangeOrientation,
          payload: {
            orientation: orientation as OrientationType
          }
        });
      });
    }
    return () => {
      removeOrientationListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupportLandscape]);
}
