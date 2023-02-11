import type { StateGuideLineBreakpointType } from '../../../Core';
import type { MediaQueryAllQueryable } from '../../../MediaQuery';
import type { ScaleFuncType } from '../Scale';

export type DeepMapArgType = {
  styles: Record<string, any>;
  guideLineBreakpoint: StateGuideLineBreakpointType;
  device?: Partial<MediaQueryAllQueryable>;
  scaleFunc?: ScaleFuncType;
};
