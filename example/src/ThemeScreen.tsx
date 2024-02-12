import React from 'react';
import { View } from 'react-native';
import {
  CustomStyleSheet,
  type MediaQueryAllQueryable,
  type StyleSheetPropsType,
  useDevice,
  useTheme,
} from 'rn-custom-style-sheet';
import Colors from './ThemeColors';

const normalStyleSheet = (styleOption: StyleSheetPropsType) =>
  CustomStyleSheet.create(
    {
      screenView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors[styleOption.themeMode]?.srnBackgroundColor,
      },
      boxView: {
        height: 150,
        width: 150,
        backgroundColor: Colors[styleOption.themeMode]?.btnBackgroundColor,
      },
    },
    { ...styleOption, isDisableScaling: true }
  );

const mediaQueryStyleSheet = (styleOption: StyleSheetPropsType) =>
  CustomStyleSheet.create(
    {
      'boxView': {
        height: 150,
        width: 150,
      },
      '@media (orientation: portrait)': {
        boxView: {
          backgroundColor: Colors[styleOption.themeMode]?.btnBackgroundColor,
        },
      },
      '@media (orientation: landscape)': {
        boxView: {
          backgroundColor: Colors[styleOption.themeMode]?.btnShadowColor,
        },
      },
    },
    { ...styleOption, isDisableScaling: true }
  );

export const ThemeScreen = () => {
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  const { styles: normalStyles } = useTheme(normalStyleSheet);
  const { styles: mediaQueryStyles } = useTheme(mediaQueryStyleSheet, device);
  return (
    <View style={normalStyles.screenView}>
      <View style={normalStyles.boxView} />
      <View style={mediaQueryStyles.boxView} />
    </View>
  );
};
