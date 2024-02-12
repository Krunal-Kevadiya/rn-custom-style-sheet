export type UseScaleUtilsReturnType = {
  heightPercentageToDP: (
    heightPercent: number,
    skipAspectRatio: boolean
  ) => number;
  scale: (
    size: number,
    skipAspectRatio: boolean,
    threshold: number | undefined
  ) => number;
  moderateScale: (
    size: number,
    skipAspectRatio: boolean,
    threshold: number | undefined,
    factor: number
  ) => number;
  horizontalScale: (size: number, skipAspectRatio: boolean) => number;
  moderateHorizontalScale: (
    size: number,
    skipAspectRatio: boolean,
    factor: number
  ) => number;
  moderateVerticalScale: (
    size: number,
    skipAspectRatio: boolean,
    factor: number
  ) => number;
  sdp: (size: number, skipAspectRatio: boolean) => number;
  ssp: (size: number, skipAspectRatio: boolean) => number;
  verticalScale: (size: number, skipAspectRatio: boolean) => number;
  viewportHeight: (size: number, skipAspectRatio: boolean) => number;
  viewportMax: (size: number, skipAspectRatio: boolean) => number;
  viewportMin: (size: number, skipAspectRatio: boolean) => number;
  viewportWidth: (size: number, skipAspectRatio: boolean) => number;
  widthPercentageToDP: (
    widthPercent: number,
    skipAspectRatio: boolean
  ) => number;
};
