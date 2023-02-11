import {
  getBreakpointValueByIndex,
  hasValidBreakpointPropertyFormat,
} from '../../../BreakPoint';
import {
  toPx,
  type GuideLineLayoutType,
  type ScreenResolutionType,
  UnitEnum,
  type StateGuideLineBreakpointType,
  type GeneralScreenResolutionType,
} from '../../../Core';
import {
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
} from '../Metrics';

// Groups   Size Unit   Func    Factor threshold SkipAspectRatio Round
// Index     1    2   3/4/6/10   5/7     9/12         13          14

const validScaleSheetRegex: RegExp = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /^(\-?\d+(?:\.\d{1,3})?)(em|rem|px|cm|mm|in|pt|pc)?@(hs|vs|wp|hp|vh|vw|vmin|vmax|sdp|ssp|(mvs|mhs)(\d+(?:\.\d{1,2})?)?|(ms)(\d+(?:\.\d{1,2})?)?(t(\d+(?:\.\d{1,2})?))?|(s)(t(\d+(?:\.\d{1,2})?))?)(sar)?(r)?$/i
);

export type ScaleFuncType = (value: any) => number | string | undefined;

export function scaleFunc(
  screenResolution: ScreenResolutionType,
  guideLineLayout: GuideLineLayoutType,
  guideLineBreakpoint: StateGuideLineBreakpointType,
  generalScreenResolution: GeneralScreenResolutionType,
  currentBreakpointIndex: number
): ScaleFuncType {
  return function scalingFn(value: any): number | string | undefined {
    let derivedValue = value;
    if (hasValidBreakpointPropertyFormat(derivedValue, guideLineBreakpoint)) {
      derivedValue = getBreakpointValueByIndex(
        derivedValue,
        currentBreakpointIndex,
        guideLineBreakpoint
      );
    }
    try {
      if (!validScaleSheetRegex.test(derivedValue)) {
        return derivedValue;
      }

      const regexExecResult: RegExpExecArray | null =
        validScaleSheetRegex.exec(derivedValue);
      // get the size of the component
      const size: number = parseFloat(regexExecResult?.[1] ?? '0');

      // get the unit of the value
      const unit: string = regexExecResult?.[2]?.toLowerCase() ?? UnitEnum.Px;

      // get the scale factor for font or it's string or undefined values
      const scaleFactor1: string | undefined = regexExecResult?.[5];
      const scaleFactor2: string | undefined = regexExecResult?.[7];
      const finalScaleFactor: string | undefined = scaleFactor1 ?? scaleFactor2;

      // get the scale threshold or it's string or undefined values
      const threshold1: string | undefined = regexExecResult?.[9];
      const threshold2: string | undefined = regexExecResult?.[12];
      const finalThreshold: string | undefined = threshold1 ?? threshold2;

      // get the scale function
      const scaleFuncNameIndex = scaleFactor1
        ? 4
        : scaleFactor2
        ? 6
        : threshold2
        ? 10
        : 3;
      const scaleFuncName: string =
        regexExecResult?.[scaleFuncNameIndex]?.toLowerCase() ?? '';

      // skip the aspect ratio or not
      const skipAspectRatio: boolean =
        regexExecResult?.[13]?.toLowerCase() === 'sar';

      // should result is round or not
      const shouldRound: boolean = regexExecResult?.[14]?.toLowerCase() === 'r';

      const convertSize: number = toPx(size, unit);
      const threshold: number | undefined = finalThreshold
        ? parseFloat(finalThreshold)
        : undefined;
      const scaleFactor: number | undefined = parseFloat(
        finalScaleFactor ?? '0.5'
      );

      let result;
      switch (scaleFuncName) {
        case 's':
          result = scale(guideLineLayout, generalScreenResolution)(
            convertSize,
            skipAspectRatio,
            threshold
          );
          break;
        case 'ms':
          result = moderateScale(guideLineLayout, generalScreenResolution)(
            convertSize,
            skipAspectRatio,
            threshold,
            scaleFactor
          );
          break;
        case 'hs':
          result = horizontalScale(screenResolution, guideLineLayout)(
            convertSize,
            skipAspectRatio
          );
          break;
        case 'vs':
          result = verticalScale(screenResolution, guideLineLayout)(
            convertSize,
            skipAspectRatio
          );
          break;
        case 'mhs':
          result = moderateHorizontalScale(screenResolution, guideLineLayout)(
            convertSize,
            skipAspectRatio,
            scaleFactor
          );
          break;
        case 'mvs':
          result = moderateVerticalScale(screenResolution, guideLineLayout)(
            convertSize,
            skipAspectRatio,
            scaleFactor
          );
          break;
        case 'hp':
          result = heightPercentageToDP(screenResolution, guideLineLayout)(
            convertSize,
            skipAspectRatio
          );
          break;
        case 'wp':
          result = widthPercentageToDP(screenResolution, guideLineLayout)(
            convertSize,
            skipAspectRatio
          );
          break;
        case 'vmin':
          result = viewportMin(screenResolution, guideLineLayout)(
            convertSize,
            skipAspectRatio
          );
          break;
        case 'vmax':
          result = viewportMax(screenResolution, guideLineLayout)(
            convertSize,
            skipAspectRatio
          );
          break;
        case 'vh':
          result = viewportHeight(screenResolution, guideLineLayout)(
            convertSize,
            skipAspectRatio
          );
          break;
        case 'vw':
          result = viewportWidth(screenResolution, guideLineLayout)(
            convertSize,
            skipAspectRatio
          );
          break;
        case 'sdp':
          result = sdp(screenResolution, guideLineLayout)(
            convertSize,
            skipAspectRatio
          );
          break;
        case 'ssp':
          result = ssp(screenResolution, guideLineLayout)(
            convertSize,
            skipAspectRatio
          );
          break;
        default:
      }

      return shouldRound ? Math.round(result ?? 0) : result;
    } catch (e) {
      return derivedValue;
    }
  };
}
