import { useContext } from 'react';

import { type ThemeContextType, ThemeContext } from '../../Context';

export default function useThemeContext(): ThemeContextType {
  return useContext<ThemeContextType>(ThemeContext);
}
