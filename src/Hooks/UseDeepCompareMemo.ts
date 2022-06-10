import React, { useMemo } from 'react';

import { checkDeps, useDeepCompareMemoize } from './HookUtil';

export default function useDeepCompareMemo<T>(factory: () => T, dependencies: React.DependencyList) {
  if (__DEV__) {
    checkDeps(dependencies, 'useDeepCompareMemo');
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, useDeepCompareMemoize(dependencies));
}
