import type {
  GuideLineLayoutType,
  ScreenResolutionType,
  StateGuideLineBreakpointType,
  GeneralScreenResolutionType,
} from '../../../Core';
import type { MediaQueryAllQueryable } from '../../../MediaQuery';
import { styleProcess, scaleFunc } from '../../../Scaling';
import type {
  BoundStyles,
  NamedStyles,
  StyleSheetOption,
} from './CustomStyleSheetTypes';

namespace CustomStyleSheet {
  export function create<T extends BoundStyles<Record<string, any>>>(
    styles: BoundStyles<Record<string, any>>,
    option: StyleSheetOption
  ): NamedStyles<T> {
    const localIsDisableScaling: boolean = option.isDisableScaling ?? false;
    const localDevice: Partial<MediaQueryAllQueryable> = option.device;
    const localScreenResolution: ScreenResolutionType = option.screenResolution;
    const localGuideLineLayout: GuideLineLayoutType = option.guideLineLayout;
    const localGuideLineBreakpoint: StateGuideLineBreakpointType =
      option.guideLineBreakpoint;
    const localGeneralScreenResolution: GeneralScreenResolutionType =
      option.generalScreenResolution;
    const localCurrentBreakpointIndex = option.currentBreakpointIndex;

    return styleProcess({
      styles,
      device: localDevice,
      guideLineBreakpoint: localGuideLineBreakpoint,
      scaleFunc: localIsDisableScaling
        ? undefined
        : scaleFunc(
            localScreenResolution,
            localGuideLineLayout,
            localGuideLineBreakpoint,
            localGeneralScreenResolution,
            localCurrentBreakpointIndex
          ),
    }) as NamedStyles<T>;
  }
}

export default CustomStyleSheet;
