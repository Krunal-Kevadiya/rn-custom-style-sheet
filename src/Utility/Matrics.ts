import { Dimensions, EmitterSubscription, PixelRatio } from 'react-native';

import { configs } from '../CustomStyleSheet';
import { ORIENTATION } from '../Hooks';

// Retrieve initial screen's width
export let screenWidth: number = Dimensions.get('window').width;

// Retrieve initial screen's height
export let screenHeight: number = Dimensions.get('window').height;

// Retrieve initial screen's short dimension
export let shortDimension: number = Math.min(screenWidth, screenHeight);

// Retrieve initial screen's long dimension
export let longDimension: number = Math.max(screenWidth, screenHeight);

export function getNewSize(size: number): number {
  const aspectRatio: number = screenHeight / screenWidth;
  let newSize: number = 0;
  if (aspectRatio > 1.77) {
    newSize = size;
  } else if (aspectRatio > 1.6) {
    newSize = size * 0.97;
  } else if (aspectRatio > 1.55) {
    newSize = size * 0.95;
  } else if (aspectRatio > 1.5) {
    newSize = size * 0.93;
  } else if (aspectRatio > 1.45) {
    newSize = size * 0.91;
  } else if (aspectRatio > 1.4) {
    newSize = size * 0.89;
  } else if (aspectRatio > 1.35) {
    newSize = size * 0.87;
  } else if (aspectRatio > 1.329) {
    return size;
  } else if (aspectRatio > 1.3) {
    newSize = size * 0.85;
  } else if (aspectRatio > 1.2) {
    newSize = size * 0.84;
  } else if (aspectRatio > 1.185) {
    return size * 0.95;
  } else if (aspectRatio > 1.15) {
    return size * 0.82;
  } else {
    newSize = size * 0.6;
  }
  return newSize;
}

/**
 * Converts provided width to based on provided guideline size width.
 * @param  {number} size The screen's width that UI element should cover
 * @param  {boolean} skipAspectRatio The screen's width that UI element should
 *                                    cover at that time check screen aspect ration config
 * @return {number} The calculated scale depending on current device's screen width.
 */
export function scale(size: number, skipAspectRatio: boolean = false): number {
  const changeSize: number = skipAspectRatio ? size : configs.guidelineBaseAspectRatioFn(size);
  return (screenWidth / configs.guidelineBaseWidth) * changeSize;
}

/**
 * Converts provided height to based on provided guideline size height.
 * @param  {number} size The screen's height that UI element should cover
 * @param  {boolean} skipAspectRatio The screen's height that UI element should
 *                                    cover at that time check screen aspect ration config
 * @return {number} The calculated vertical scale depending on current device's screen height.
 */
export function verticalScale(size: number, skipAspectRatio: boolean = false): number {
  const changeSize: number = skipAspectRatio ? size : configs.guidelineBaseAspectRatioFn(size);
  return (screenHeight / configs.guidelineBaseHeight) * changeSize;
}

/**
 * Converts provided width to based on provided guideline size width.
 * @param  {number} size The screen's width that UI element should cover
 * @param  {boolean} skipAspectRatio The screen's width that UI element should
 *                                    cover at that time check screen aspect ration config
 * @param {number} factor apply scale up or down on given width.
 * @return {number} The calculated moderate scale depending on current device's screen width.
 */
export function moderateScale(size: number, skipAspectRatio: boolean = false, factor: number = 0.5): number {
  const changeSize: number = skipAspectRatio ? size : configs.guidelineBaseAspectRatioFn(size);
  return changeSize + (scale(changeSize, skipAspectRatio) - changeSize) * factor;
}

/**
 * Converts provided height to based on provided guideline size height.
 * @param  {number} size The screen's height that UI element should cover
 * @param  {boolean} skipAspectRatio The screen's height that UI element should
 *                                    cover at that time check screen aspect ration config
 * @param {number} factor apply scale up or down on given height.
 * @return {number} The calculated moderate vertical scale depending on current device's screen height.
 */
export function moderateVerticalScale(size: number, skipAspectRatio: boolean = false, factor: number = 0.5): number {
  const changeSize: number = skipAspectRatio ? size : configs.guidelineBaseAspectRatioFn(size);
  return changeSize + (verticalScale(changeSize, skipAspectRatio) - changeSize) * factor;
}

/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {string} widthPercent The percentage of screen's width that UI element should cover
 * @return {number} The calculated dp depending on current device's screen width.
 */
export function widthPercentageToDP(widthPercent: number): number {
  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenWidth * widthPercent) / 100);
}

/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {string} heightPercent The percentage of screen's height that UI element should cover.
 * @return {number} The calculated dp depending on current device's screen height.
 */
export function heightPercentageToDP(heightPercent: number): number {
  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenHeight * heightPercent) / 100);
}

export function viewportMin(size: number, skipAspectRatio: boolean = false): number {
  const changeSize: number = skipAspectRatio ? size : configs.guidelineBaseAspectRatioFn(size);
  return (changeSize / 100) * shortDimension;
}

export function viewportMax(size: number, skipAspectRatio: boolean = false): number {
  const changeSize: number = skipAspectRatio ? size : configs.guidelineBaseAspectRatioFn(size);
  return (changeSize / 100) * longDimension;
}

export function viewportHeight(size: number, skipAspectRatio: boolean = false): number {
  const changeSize: number = skipAspectRatio ? size : configs.guidelineBaseAspectRatioFn(size);
  return (changeSize / 100) * screenHeight;
}

export function viewportWidth(size: number, skipAspectRatio: boolean = false): number {
  const changeSize: number = skipAspectRatio ? size : configs.guidelineBaseAspectRatioFn(size);
  return (changeSize / 100) * screenWidth;
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
let subscription: EmitterSubscription;
export function listenOrientationChange(callback?: (orientation: string) => void): EmitterSubscription {
  subscription = Dimensions.addEventListener('change', ({ window }) => {
    // Retrieve and save new dimensions
    screenWidth = window.width;
    screenHeight = window.height;
    currentWidthDimen = 0;
    shortDimension = Math.min(screenWidth, screenHeight);
    longDimension = Math.max(screenWidth, screenHeight);

    // Trigger screen's rerender with a state update of the orientation variable
    callback?.(screenWidth < screenHeight ? ORIENTATION.PORTRAIT : ORIENTATION.LANDSCAPE);
  });
  return subscription;
}

/**
 * Wrapper function that removes orientation change listener and should be invoked in
 * componentWillUnmount lifecycle method of every class component (UI screen) that
 * listenOrientationChange function has been invoked. This should be done in order to
 * avoid adding new listeners every time the same component is re-mounted.
 */
export function removeOrientationListener(): void {
  subscription?.remove();
}

let currentWidthDimen: number = 0;

const dimenMin: number = 300;
const dimenMax: number = 1080;
const dimenInterval: number = 30;

const getAvailableWidthDimension = () => {
  if (currentWidthDimen === 0) {
    var dimen: number = screenWidth;
    for (let i: number = dimenMin; i <= dimenMax; i = i + dimenInterval) {
      if (screenWidth >= i && screenWidth < i + dimenInterval) {
        dimen = i;
        break; // stop the loop
      }
    }
    currentWidthDimen = dimen;
    return dimen;
  } else {
    return currentWidthDimen;
  }
};

export function sdp(size: number, skipAspectRatio: boolean = false): number {
  var changeSize: number = skipAspectRatio ? size : configs.guidelineBaseAspectRatioFn(size);
  const dimen: number = getAvailableWidthDimension();
  if (dimen !== 0) {
    const ratio: number = changeSize / dimenMin;
    changeSize = ratio * dimen;
  }
  return parseFloat(changeSize.toFixed(2));
}

export function ssp(size: number, skipAspectRatio: boolean = false): number {
  var changeSize: number = skipAspectRatio ? size : configs.guidelineBaseAspectRatioFn(size);
  const dimen: number = getAvailableWidthDimension();
  if (dimen !== 0) {
    const ratio: number = changeSize / dimenMin;
    changeSize = ratio * dimen;
  }
  return parseFloat(changeSize.toFixed(2)) * PixelRatio.getFontScale();
}
