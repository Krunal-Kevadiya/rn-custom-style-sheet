// @ts-nocheck
import { StyleSheet } from 'react-native';

import type { ThemeType } from './Types';

/**
 * @Get Dark Style
 * @param key is style object key name
 * @param value is style object
 * @returns {darkThemeStyle} is object style
 */
function getStyleDark(key: string, value?: string): object {
  if (value) return { [key]: value };
  return {};
}

/**
 * @Processing Theme Style Processor
 * @param style is style object or array of style object
 * @param type is 'light' | 'dark'
 * @returns {darkThemeStyle} is object style
 */
export function themeStyleProcessor(style: object | Array<object>, type: ThemeType = 'light'): object {
  const flattenStyle = Array.isArray(style) ? StyleSheet.flatten(style) : style;

  const {
    backgroundColorDark,
    borderBottomColorDark,
    borderColorDark,
    borderEndColorDark,
    borderLeftColorDark,
    borderRightColorDark,
    borderStartColorDark,
    borderTopColorDark,
    shadowColorDark,
    colorDark,
    textShadowColorDark,
    textDecorationColorDark,
    overlayColorDark,
    tintColorDark,
    ...other
  } = flattenStyle;
  if (type === 'light') {
    return other;
  } else {
    return StyleSheet.flatten([
      other,
      getStyleDark('backgroundColor', backgroundColorDark),
      getStyleDark('borderBottomColor', borderBottomColorDark),
      getStyleDark('borderColor', borderColorDark),
      getStyleDark('borderEndColor', borderEndColorDark),
      getStyleDark('borderLeftColor', borderLeftColorDark),
      getStyleDark('borderRightColor', borderRightColorDark),
      getStyleDark('borderStartColor', borderStartColorDark),
      getStyleDark('borderTopColor', borderTopColorDark),
      getStyleDark('shadowColor', shadowColorDark),
      getStyleDark('color', colorDark),
      getStyleDark('textShadowColor', textShadowColorDark),
      getStyleDark('textDecorationColor', textDecorationColorDark),
      getStyleDark('overlayColor', overlayColorDark),
      getStyleDark('tintColor', tintColorDark)
    ]);
  }
}
