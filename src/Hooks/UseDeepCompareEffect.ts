import React, { useEffect } from 'react';

import { checkDeps, useDeepCompareMemoize } from './HookUtil';

export default function useDeepCompareEffect(effect: React.EffectCallback, dependencies: React.DependencyList) {
  if (__DEV__) {
    checkDeps(dependencies, 'useDeepCompareEffect');
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, useDeepCompareMemoize(dependencies));
}
