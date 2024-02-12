import { useMemo } from 'react';

import {
  type GuideLineLayoutType,
  type ScreenResolutionType,
  useGuideLineLayout,
  useScreenResolution,
  useGeneralScreenResolution,
  type GeneralScreenResolutionType,
} from '../../../Core';
import {
  heightPercentageToDP as getHeightPercentageToDP,
  horizontalScale as getHorizontalScale,
  moderateHorizontalScale as getModerateHorizontalScale,
  moderateVerticalScale as getModerateVerticalScale,
  sdp as getSdp,
  ssp as getSsp,
  verticalScale as getVerticalScale,
  viewportHeight as getViewportHeight,
  viewportMax as getViewportMax,
  viewportMin as getViewportMin,
  viewportWidth as getViewportWidth,
  widthPercentageToDP as getWidthPercentageToDP,
  scale as getScale,
  moderateScale as getModerateScale,
} from '../../Utils';
import type { UseScaleUtilsReturnType } from './UseScaleUtilsTypes';

export default function useScaleUtils(): UseScaleUtilsReturnType {
  const screenResolution: ScreenResolutionType = useScreenResolution();
  const guideLineLayout: GuideLineLayoutType = useGuideLineLayout();
  const generalScreenResolution: GeneralScreenResolutionType =
    useGeneralScreenResolution();

  const scale = useMemo<
    (
      size: number,
      skipAspectRatio: boolean,
      threshold: number | undefined
    ) => number
  >(
    () => getScale(guideLineLayout, generalScreenResolution),
    [guideLineLayout, generalScreenResolution]
  );

  const moderateScale = useMemo<
    (
      size: number,
      skipAspectRatio: boolean,
      threshold: number | undefined,
      factor: number
    ) => number
  >(
    () => getModerateScale(guideLineLayout, generalScreenResolution),
    [guideLineLayout, generalScreenResolution]
  );

  const horizontalScale = useMemo<
    (size: number, skipAspectRatio: boolean) => number
  >(
    () => getHorizontalScale(screenResolution, guideLineLayout),
    [screenResolution, guideLineLayout]
  );

  const verticalScale = useMemo<
    (size: number, skipAspectRatio: boolean) => number
  >(
    () => getVerticalScale(screenResolution, guideLineLayout),
    [screenResolution, guideLineLayout]
  );

  const moderateHorizontalScale = useMemo<
    (size: number, skipAspectRatio: boolean, factor: number) => number
  >(
    () => getModerateHorizontalScale(screenResolution, guideLineLayout),
    [screenResolution, guideLineLayout]
  );

  const moderateVerticalScale = useMemo<
    (size: number, skipAspectRatio: boolean, factor: number) => number
  >(
    () => getModerateVerticalScale(screenResolution, guideLineLayout),
    [screenResolution, guideLineLayout]
  );

  const widthPercentageToDP = useMemo<
    (widthPercent: number, skipAspectRatio: boolean) => number
  >(
    () => getWidthPercentageToDP(screenResolution, guideLineLayout),
    [screenResolution, guideLineLayout]
  );

  const heightPercentageToDP = useMemo<
    (heightPercent: number, skipAspectRatio: boolean) => number
  >(
    () => getHeightPercentageToDP(screenResolution, guideLineLayout),
    [screenResolution, guideLineLayout]
  );

  const viewportMin = useMemo<
    (size: number, skipAspectRatio: boolean) => number
  >(
    () => getViewportMin(screenResolution, guideLineLayout),
    [screenResolution, guideLineLayout]
  );

  const viewportMax = useMemo<
    (size: number, skipAspectRatio: boolean) => number
  >(
    () => getViewportMax(screenResolution, guideLineLayout),
    [screenResolution, guideLineLayout]
  );

  const viewportHeight = useMemo<
    (size: number, skipAspectRatio: boolean) => number
  >(
    () => getViewportHeight(screenResolution, guideLineLayout),
    [screenResolution, guideLineLayout]
  );

  const viewportWidth = useMemo<
    (size: number, skipAspectRatio: boolean) => number
  >(
    () => getViewportWidth(screenResolution, guideLineLayout),
    [screenResolution, guideLineLayout]
  );

  const sdp = useMemo<(size: number, skipAspectRatio: boolean) => number>(
    () => getSdp(screenResolution, guideLineLayout),
    [screenResolution, guideLineLayout]
  );

  const ssp = useMemo<(size: number, skipAspectRatio: boolean) => number>(
    () => getSsp(screenResolution, guideLineLayout),
    [screenResolution, guideLineLayout]
  );

  return {
    heightPercentageToDP,
    horizontalScale,
    moderateHorizontalScale,
    moderateVerticalScale,
    sdp,
    ssp,
    verticalScale,
    viewportHeight,
    viewportMax,
    viewportMin,
    viewportWidth,
    widthPercentageToDP,
    scale,
    moderateScale,
  };
}
