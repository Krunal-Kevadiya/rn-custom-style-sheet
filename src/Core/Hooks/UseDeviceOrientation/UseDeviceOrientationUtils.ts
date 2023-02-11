import {
  type EmitterSubscription,
  type ScaledSize,
  Dimensions,
} from 'react-native';

import { type ScreenResolutionType, OrientationEnum } from '../../Reducer';

export type GetScreenResolutionReturnType = {
  orientation: OrientationEnum;
  screenResolution: ScreenResolutionType;
};

export function getScreenResolution(
  window: ScaledSize,
  withPortraitBehaviorInLandscapeMode: boolean
): GetScreenResolutionReturnType {
  const orientation: OrientationEnum =
    window.width < window.height
      ? OrientationEnum.Portrait
      : OrientationEnum.Landscape;
  const isPortrait: boolean =
    orientation === OrientationEnum.Portrait ||
    (orientation === OrientationEnum.Landscape &&
      !withPortraitBehaviorInLandscapeMode);
  const windowWidth: number = isPortrait ? window.width : window.height;
  const windowHeight: number = isPortrait ? window.height : window.width;
  const shortDimension: number = Math.min(windowWidth, windowHeight);
  const longDimension: number = Math.max(windowWidth, windowHeight);

  return {
    orientation,
    screenResolution: {
      windowWidth,
      windowHeight,
      shortDimension,
      longDimension,
    },
  };
}

/**
 * Event listener function that detects orientation change (every time it occurs) and triggers
 * screen rerendering. It does that, by changing the state of the screen where the function is
 * called. State changing occurs for a new state variable with the name 'orientation' that will
 * always hold the current value of the orientation after the 1st orientation change.
 * Invoke it inside the screen's constructor or in componentDidMount lifecycle method.
 * @param {object} that Screen's class component this variable. The function needs it to
 *                      invoke setState method and trigger screen rerender (this.setState()).
 */
export function listenOrientationChange(
  withPortraitBehaviorInLandscapeMode: boolean,
  callback?: (screenConfig: GetScreenResolutionReturnType) => void
): EmitterSubscription {
  const subscription: EmitterSubscription = Dimensions.addEventListener(
    'change',
    ({ window }: { window: ScaledSize; screen: ScaledSize }) => {
      // Trigger screen's rerender with a state update of the orientation variable
      callback?.(
        getScreenResolution(window, withPortraitBehaviorInLandscapeMode)
      );
    }
  );
  return subscription;
}

/**
 * Wrapper function that removes orientation change listener and should be invoked in
 * componentWillUnmount lifecycle method of every class component (UI screen) that
 * listenOrientationChange function has been invoked. This should be done in order to
 * avoid adding new listeners every time the same component is re-mounted.
 */
export function removeOrientationListener(
  subscription?: EmitterSubscription
): void {
  subscription?.remove();
}
