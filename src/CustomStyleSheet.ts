import type { MediaQueryAllQueryable } from './MediaQuery';
import type { BoundStyles, NamedStyles, StyleOption, ThemeType } from './Utility';
import { deepNestedMap, scaleFunc } from './Utility';

namespace CustomStyleSheet {
  export function create<T extends BoundStyles<T> | BoundStyles<any>>(
    styles: T | BoundStyles<T>,
    option?: StyleOption
  ): NamedStyles<T> {
    const localOnlyTheme: boolean = option?.onlyTheme ?? false;
    const localScaleTheme: boolean = option?.onlyScale ?? false;
    const localTheme: ThemeType = option?.theme ?? 'light';
    const localDevice: Partial<MediaQueryAllQueryable> | undefined = option?.device;

    return deepNestedMap({
      styles,
      device: localDevice,
      theme: localScaleTheme ? undefined : localTheme,
      scaleFunc: localOnlyTheme ? undefined : scaleFunc
    }) as NamedStyles<T>;
  }
}

export default CustomStyleSheet;
