import { Platform } from 'react-native';
import type { GuideLineLayoutType, BaseSizeLayoutType } from '../../Provider';
import type {
  GeneralScreenResolutionType,
  ScreenResolutionType,
} from '../../Reducer';

export function getGeneralScreenResolution(
  screenResolution: ScreenResolutionType,
  guideLineLayout: GuideLineLayoutType,
  baseSizeLayout?: Partial<BaseSizeLayoutType>
): GeneralScreenResolutionType {
  const baseWidth: number =
    screenResolution.shortDimension / guideLineLayout.width;
  const baseHeight: number =
    screenResolution.longDimension / guideLineLayout.height;
  // Calculate the base size by averaging the base width and base height.
  const baseSizeRatio: number = (baseWidth + baseHeight) / 2;

  // Consider 1.2 as a threshold for identifying tablets based on analyzing multiple devices.
  const isIPad: boolean = Platform.OS === 'ios' && Platform.isPad;
  const isTablet: boolean =
    isIPad || baseSizeRatio > (baseSizeLayout?.androidTabletRatio ?? 1.2);

  let threshold: number = isTablet
    ? baseSizeLayout?.thresholdOfTablet ?? 0.4
    : baseSizeLayout?.thresholdOfPhone ?? 0.5;
  if (baseSizeLayout?.thresholdFunction) {
    threshold = baseSizeLayout.thresholdFunction(baseSizeRatio, isTablet);
  }

  // Adjust the base size based on whether the device is identified as a tablet or not.
  const baseSizeWithThreshold: number = (baseWidth + baseHeight) * threshold;

  return {
    baseWidth,
    baseHeight,
    isTablet,
    threshold,
    baseSizeRatio,
    baseSizeWithThreshold,
  };
}
