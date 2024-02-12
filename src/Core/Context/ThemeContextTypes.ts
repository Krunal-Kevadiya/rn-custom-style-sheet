import type { Dispatch } from 'react';

import type { InitialThemeStateType, ThemeActions } from '../Reducer';
import type { GuideLineStorageType } from './../Provider';

export type ThemeContextType = {
  state: InitialThemeStateType<''>;
  dispatch: Dispatch<ThemeActions>;
  storage?: GuideLineStorageType;
};
