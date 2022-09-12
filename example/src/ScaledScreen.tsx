import React from 'react';
import { View } from 'react-native';
import { CustomStyleSheet, MediaQueryAllQueryable, StyleSheetOption, useDevice, useTheme } from 'rn-custom-style-sheet';

const normalStyleSheet = (styleOption: StyleSheetOption) =>
  CustomStyleSheet.create(
    {
      screenView: {
        height: '50@vs',
        width: '50@vs',
        backgroundColor: 'red'
      }
    },
    { ...styleOption, onlyScale: true }
  );

const mediaQueryStyleSheet = (styleOption: StyleSheetOption) =>
  CustomStyleSheet.create(
    {
      screenView: {
        height: '50@vs',
        width: '50@vs',
        backgroundColor: 'red'
      },
      '@media (orientation: portrait)': {
        screenView: {
          backgroundColor: 'red'
        }
      },
      '@media (orientation: landscape)': {
        screenView: {
          backgroundColor: 'green'
        }
      }
    },
    { ...styleOption, onlyScale: true }
  );

export const ScaledScreen = () => {
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
