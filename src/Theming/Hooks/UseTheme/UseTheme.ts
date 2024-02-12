import { useMemo } from 'react';

import {
  type GuideLineLayoutType,
  type ScreenResolutionType,
  type StateGuideLineBreakpointType,
  ThemeModeEnum,
  OrientationEnum,
  useCurrentOrientation,
  useDeepCompareMemo,
  useGuideLineBreakpoint,
  useGuideLineLayout,
  useScreenResolution,
  useCurrentBreakpointIndex,
  useGeneralScreenResolution,
  type GeneralScreenResolutionType,
} from '../../../Core';
import { type MediaQueryAllQueryable, useDevice } from '../../../MediaQuery';
import { useCurrentThemeMode } from '../UseCurrentThemeMode';
import { useCurrentThemeName } from '../UseCurrentThemeName';
import type { StyleSheetPropsType, UseThemeReturnType } from './UseThemeTypes';

export default function useTheme<T>(
  styleSheetFn?: (styleOption: StyleSheetPropsType) => T,
  device?: Partial<MediaQueryAllQueryable>
): UseThemeReturnType<T> {
  const themeName: string = useCurrentThemeName();
  const themeMode: ThemeModeEnum = useCurrentThemeMode();
  const screenResolution: ScreenResolutionType = useScreenResolution();
  const guideLineLayout: GuideLineLayoutType = useGuideLineLayout();
  const guideLineBreakpoint: StateGuideLineBreakpointType =
    useGuideLineBreakpoint();
  const generalScreenResolution: GeneralScreenResolutionType =
    useGeneralScreenResolution();
  const localDevice: Partial<MediaQueryAllQueryable> = useDevice();
  const orientation: OrientationEnum = useCurrentOrientation();
  const currentBreakpointIndex: number = useCurrentBreakpointIndex();

  const isDark: boolean = useMemo<boolean>(
    () => themeMode === ThemeModeEnum.Dark,
    [themeMode]
  );

  const isPortrait: boolean = useMemo<boolean>(
    () => orientation === OrientationEnum.Portrait,
    [orientation]
  );

  const styles: T = useDeepCompareMemo<T>(
    () =>
      (styleSheetFn?.({
        isDark,
        isPortrait,
        themeName,
        themeMode,
        screenResolution,
        guideLineLayout,
        guideLineBreakpoint,
        generalScreenResolution,
        device: device ?? localDevice,
        currentBreakpointIndex,
      }) ?? {}) as T,
    [
      isDark,
      isPortrait,
      themeName,
      themeMode,
      screenResolution,
      guideLineLayout,
      guideLineBreakpoint,
      generalScreenResolution,
      device,
      localDevice,
      currentBreakpointIndex,
    ]
  );
  return { styles, themeName, themeMode, isDark, isPortrait };
}
