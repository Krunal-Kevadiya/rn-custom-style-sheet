import React from 'react';
import { View } from 'react-native';
import { CustomStyleSheet, MediaQueryAllQueryable, StyleSheetOption, useDevice, useTheme } from 'rn-custom-style-sheet';

const normalStyleSheet = (styleOption: StyleSheetOption) =>
  CustomStyleSheet.create(
    {
      screenView: {
        height: '50@vs',
        width: '50@vs',
        backgroundColor: 'red',
        backgroundColorDark: 'green'
      }
    },
    styleOption
  );

const mediaQueryStyleSheet = (styleOption: StyleSheetOption) =>
  CustomStyleSheet.create(
    {
      screenView: {
        height: '50@vs',
        width: '50@vs',
        backgroundColor: 'red',
        backgroundColorDark: 'green'
      },
      '@media (orientation: portrait)': {
        screenView: {
          height: '50@vs',
          width: '50@vs',
          backgroundColor: 'red',
          backgroundColorDark: 'green'
        }
      },
      '@media (orientation: landscape)': {
        screenView: {
          height: '90@vs',
          width: '90@vs',
          backgroundColor: 'green',
          backgroundColorDark: 'red'
        }
      }
    },
    styleOption
  );

export const ScaledThemeScreen = () => {
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  const { styles: normalStyles } = useTheme(normalStyleSheet);
  const { styles: mediaQueryStyles } = useTheme(mediaQueryStyleSheet, device);
  return (
    <>
      <View style={normalStyles.screenView} />
      <View style={mediaQueryStyles.screenView} />
    </>
  );
};
