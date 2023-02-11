import { useWindowDimensions } from 'react-native';
import {
  getBreakpointValueByIndex,
  getCurrentBreakpointIndex,
  hasValidBreakpointPropertyFormat,
} from '../../Utils';
import {
  type StateGuideLineBreakpointType,
  useGuideLineBreakpoint,
} from '../../../Core';

export default function useBreakpoint(
  values: Record<string, string | number> | string[] | number[]
): string | number | undefined {
  const screenWidth: number = useWindowDimensions().width;
  const guideLineBreakpoint: StateGuideLineBreakpointType =
    useGuideLineBreakpoint();
  if (hasValidBreakpointPropertyFormat(values, guideLineBreakpoint)) {
    const breakpointIndex: number = getCurrentBreakpointIndex(
      guideLineBreakpoint.values,
      screenWidth
    );
    return getBreakpointValueByIndex(
      values,
      breakpointIndex,
      guideLineBreakpoint
    );
  } else {
    return undefined;
  }
}
