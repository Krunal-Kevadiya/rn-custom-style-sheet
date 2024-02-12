import { PixelRatio } from 'react-native';
import type {
  GuideLineLayoutType,
  ScreenResolutionType,
  GeneralScreenResolutionType,
} from '../../../Core';

export function getNewSize(
  screenResolution: ScreenResolutionType
): (size: number) => number {
  return function getSize(size: number): number {
    const aspectRatio: number =
      screenResolution.windowHeight / screenResolution.windowWidth;
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
  };
}

function changeSizeByConfig({
  size,
  skipAspectRatio,
  guideLineLayout,
}: {
  size: number;
  skipAspectRatio: boolean;
  guideLineLayout: GuideLineLayoutType;
}): number {
  const changeSize: number = skipAspectRatio
    ? size
    : guideLineLayout.aspectRatioFunction!(size);

  return changeSize;
}

/**
 * Converts the provided size based on the calculated base size.
 * @param {number} size - The screen's size that UI element should cover
 * @returns {number} The scaled size depending on the current device's screen size.
 */
export function scale(
  guideLineLayout: GuideLineLayoutType,
  generalScreenResolution: GeneralScreenResolutionType
): (
  size: number,
  skipAspectRatio: boolean,
  threshold: number | undefined
) => number {
  return function getScale(
    size: number,
    skipAspectRatio: boolean = false,
    threshold: number | undefined = undefined
  ): number {
    let baseSize: number = generalScreenResolution.baseSizeWithThreshold;
    if (threshold) {
      baseSize =
        (generalScreenResolution.baseHeight +
          generalScreenResolution.baseWidth) *
        threshold;
    }
    const changeSize: number = changeSizeByConfig({
      size,
      skipAspectRatio,
      guideLineLayout,
    });
    return Math.ceil(changeSize * baseSize);
  };
}

/**
 * Converts provided width to based on provided guideline size width.
 * @param  {number} size The screen's width that UI element should cover
 * @param  {boolean} skipAspectRatio The screen's width that UI element should
 *                                    cover at that time check screen aspect ration config
 * @param {number} factor apply scale up or down on given width.
 * @return {number} The calculated moderate scale depending on current device's screen size.
 */
export function moderateScale(
  guideLineLayout: GuideLineLayoutType,
  generalScreenResolution: GeneralScreenResolutionType
): (
  size: number,
  skipAspectRatio: boolean,
  threshold: number | undefined,
  factor: number
) => number {
  return function getModerateHorizontalScale(
    size: number,
    skipAspectRatio: boolean = false,
    threshold: number | undefined = undefined,
    factor: number = 0.5
  ): number {
    let baseSize: number = generalScreenResolution.baseSizeWithThreshold;
    if (threshold) {
      baseSize =
        (generalScreenResolution.baseHeight +
          generalScreenResolution.baseWidth) *
        threshold;
    }
    const changeSize: number = changeSizeByConfig({
      size,
      skipAspectRatio,
      guideLineLayout,
    });
    const ls = scale(guideLineLayout, generalScreenResolution);
    return Math.ceil(
      (changeSize +
        (ls(changeSize, skipAspectRatio, threshold) - changeSize) * factor) *
        baseSize
    );
  };
}

/**
 * Converts provided width to based on provided guideline size width.
 * @param  {number} size The screen's width that UI element should cover
 * @param  {boolean} skipAspectRatio The screen's width that UI element should
 *                                    cover at that time check screen aspect ration config
 * @return {number} The calculated scale depending on current device's screen width.
 */
export function horizontalScale(
  screenResolution: ScreenResolutionType,
  guideLineLayout: GuideLineLayoutType
): (size: number, skipAspectRatio: boolean) => number {
  return function getHorizontalScale(
    size: number,
    skipAspectRatio: boolean = false
  ): number {
    const changeSize: number = changeSizeByConfig({
      size,
      skipAspectRatio,
      guideLineLayout,
    });
    return (screenResolution.windowWidth / guideLineLayout.width) * changeSize;
  };
}

/**
 * Converts provided height to based on provided guideline size height.
 * @param  {number} size The screen's height that UI element should cover
 * @param  {boolean} skipAspectRatio The screen's height that UI element should
 *                                    cover at that time check screen aspect ration config
 * @return {number} The calculated vertical scale depending on current device's screen height.
 */
export function verticalScale(
  screenResolution: ScreenResolutionType,
  guideLineLayout: GuideLineLayoutType
): (size: number, skipAspectRatio: boolean) => number {
  return function getVerticalScale(
    size: number,
    skipAspectRatio: boolean = false
  ): number {
    const changeSize: number = changeSizeByConfig({
      size,
      skipAspectRatio,
      guideLineLayout,
    });
    return (
      (screenResolution.windowHeight / guideLineLayout.height) * changeSize
    );
  };
}

/**
 * Converts provided width to based on provided guideline size width.
 * @param  {number} size The screen's width that UI element should cover
 * @param  {boolean} skipAspectRatio The screen's width that UI element should
 *                                    cover at that time check screen aspect ration config
 * @param {number} factor apply scale up or down on given width.
 * @return {number} The calculated moderate scale depending on current device's screen width.
 */
export function moderateHorizontalScale(
  screenResolution: ScreenResolutionType,
  guideLineLayout: GuideLineLayoutType
): (size: number, skipAspectRatio: boolean, factor: number) => number {
  return function getModerateHorizontalScale(
    size: number,
    skipAspectRatio: boolean = false,
    factor: number = 0.5
  ): number {
    const changeSize: number = changeSizeByConfig({
      size,
      skipAspectRatio,
      guideLineLayout,
    });
    const hs = horizontalScale(screenResolution, guideLineLayout);
    return changeSize + (hs(changeSize, skipAspectRatio) - changeSize) * factor;
  };
}

/**
 * Converts provided height to based on provided guideline size height.
 * @param  {number} size The screen's height that UI element should cover
 * @param  {boolean} skipAspectRatio The screen's height that UI element should
 *                                    cover at that time check screen aspect ration config
 * @param {number} factor apply scale up or down on given height.
 * @return {number} The calculated moderate vertical scale depending on current device's screen height.
 */
export function moderateVerticalScale(
  screenResolution: ScreenResolutionType,
  guideLineLayout: GuideLineLayoutType
): (size: number, skipAspectRatio: boolean, factor: number) => number {
  return function getModerateVerticalScale(
    size: number,
    skipAspectRatio: boolean = false,
    factor: number = 0.5
  ): number {
    const changeSize: number = changeSizeByConfig({
      size,
      skipAspectRatio,
      guideLineLayout,
    });
    const vs = verticalScale(screenResolution, guideLineLayout);
    return changeSize + (vs(changeSize, skipAspectRatio) - changeSize) * factor;
  };
}

/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {string} widthPercent The percentage of screen's width that UI element should cover
 * @return {number} The calculated dp depending on current device's screen width.
 */
export function widthPercentageToDP(
  screenResolution: ScreenResolutionType,
  guideLineLayout: GuideLineLayoutType
): (widthPercent: number, skipAspectRatio: boolean) => number {
  return function getWidthPercentageToDP(
    widthPercent: number,
    skipAspectRatio: boolean = true
  ): number {
    const changeSize: number = changeSizeByConfig({
      size: widthPercent,
      skipAspectRatio,
      guideLineLayout,
    });
    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspond to an integer number of pixels.
    return PixelRatio.roundToNearestPixel(
      (screenResolution.windowWidth * changeSize) / 100
    );
  };
}

/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {string} heightPercent The percentage of screen's height that UI element should cover.
 * @return {number} The calculated dp depending on current device's screen height.
 */
export function heightPercentageToDP(
  screenResolution: ScreenResolutionType,
  guideLineLayout: GuideLineLayoutType
): (heightPercent: number, skipAspectRatio: boolean) => number {
  return function getHeightPercentageToDP(
    heightPercent: number,
    skipAspectRatio: boolean = true
  ): number {
    const changeSize: number = changeSizeByConfig({
      size: heightPercent,
      skipAspectRatio,
      guideLineLayout,
    });
    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspond to an integer number of pixels.
    return PixelRatio.roundToNearestPixel(
      (screenResolution.windowHeight * changeSize) / 100
    );
  };
}

export function viewportMin(
  screenResolution: ScreenResolutionType,
  guideLineLayout: GuideLineLayoutType
): (size: number, skipAspectRatio: boolean) => number {
  return function getViewportMin(
    size: number,
    skipAspectRatio: boolean = true
  ): number {
    const changeSize: number = changeSizeByConfig({
      size,
      skipAspectRatio,
      guideLineLayout,
    });
    return (changeSize / 100) * screenResolution.shortDimension;
  };
}

export function viewportMax(
  screenResolution: ScreenResolutionType,
  guideLineLayout: GuideLineLayoutType
): (size: number, skipAspectRatio: boolean) => number {
  return function getViewportMax(
    size: number,
    skipAspectRatio: boolean = true
  ): number {
    const changeSize: number = changeSizeByConfig({
      size,
      skipAspectRatio,
      guideLineLayout,
    });
    return (changeSize / 100) * screenResolution.longDimension;
  };
}

export function viewportHeight(
  screenResolution: ScreenResolutionType,
  guideLineLayout: GuideLineLayoutType
): (size: number, skipAspectRatio: boolean) => number {
  return function getViewportHeight(
    size: number,
    skipAspectRatio: boolean = true
  ): number {
    const changeSize: number = changeSizeByConfig({
      size,
      skipAspectRatio,
      guideLineLayout,
    });
    return (changeSize / 100) * screenResolution.windowHeight;
  };
}

export function viewportWidth(
  screenResolution: ScreenResolutionType,
  guideLineLayout: GuideLineLayoutType
): (size: number, skipAspectRatio: boolean) => number {
  return function getViewportWidth(
    size: number,
    skipAspectRatio: boolean = true
  ): number {
    const changeSize: number = changeSizeByConfig({
      size,
      skipAspectRatio,
      guideLineLayout,
    });
    return (changeSize / 100) * screenResolution.windowWidth;
  };
}

let currentWidthDimension: number = 0;

const dimensionMin: number = 300;
const dimensionMax: number = 1080;
const dimensionInterval: number = 30;

const getAvailableWidthDimension = (screenResolution: ScreenResolutionType) => {
  if (currentWidthDimension === 0) {
    let dimension: number = screenResolution.windowWidth;
    for (
      let i: number = dimensionMin;
      i <= dimensionMax;
      i = i + dimensionInterval
    ) {
      if (
        screenResolution.windowWidth >= i &&
        screenResolution.windowWidth < i + dimensionInterval
      ) {
        dimension = i;
        break; // stop the loop
      }
    }
    currentWidthDimension = dimension;
    return dimension;
  } else {
    return currentWidthDimension;
  }
};

export function sdp(
  screenResolution: ScreenResolutionType,
  guideLineLayout: GuideLineLayoutType
): (size: number, skipAspectRatio: boolean) => number {
  return function getSdp(
    size: number,
    skipAspectRatio: boolean = true
  ): number {
    let newSize: number = size;
    const dimension: number = getAvailableWidthDimension(screenResolution);
    if (dimension !== 0) {
      const ratio: number = newSize / dimensionMin;
      newSize = ratio * dimension;
    }
    const changeSize: number = changeSizeByConfig({
      size: newSize,
      skipAspectRatio,
      guideLineLayout,
    });
    return parseFloat(changeSize.toFixed(2));
  };
}

export function ssp(
  screenResolution: ScreenResolutionType,
  guideLineLayout: GuideLineLayoutType
): (size: number, skipAspectRatio: boolean) => number {
  return function getSsp(
    size: number,
    skipAspectRatio: boolean = true
  ): number {
    let newSize: number = size;
    const dimension: number = getAvailableWidthDimension(screenResolution);
    if (dimension !== 0) {
      const ratio: number = newSize / dimensionMin;
      newSize = ratio * dimension;
    }
    const changeSize: number = changeSizeByConfig({
      size: newSize,
      skipAspectRatio,
      guideLineLayout,
    });
    return parseFloat(changeSize.toFixed(2)) * PixelRatio.getFontScale();
  };
}
