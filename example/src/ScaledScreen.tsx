import React from 'react';
import { View, ViewStyle } from 'react-native';
import { CustomStyleSheet, MediaQueryAllQueryable, StyleSheetOption, useDevice, useTheme } from 'rn-custom-style-sheet';

type Styles = {
  screenView: ViewStyle;
};

const normalStyleSheet = () =>
  CustomStyleSheet.create<Styles>(
    {
      screenView: {
        height: '50@vs',
        width: '50@vs',
        backgroundColor: 'red'
      }
    },
    { onlyScale: true }
  );

const mediaQueryStyleSheet = (styleOption: StyleSheetOption) =>
  CustomStyleSheet.create<Styles>(
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
  const normalStyles = useTheme(normalStyleSheet);
  const mediaQueryStyles = useTheme(mediaQueryStyleSheet, device);
  return (
    <>
      <View style={normalStyles.screenView} />
      <View style={mediaQueryStyles.screenView} />
    </>
  );
};
