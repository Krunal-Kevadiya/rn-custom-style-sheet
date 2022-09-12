import React from 'react';
import { View } from 'react-native';
import { CustomStyleSheet, MediaQueryAllQueryable, StyleSheetOption, useDevice, useTheme } from 'rn-custom-style-sheet';

const normalStyleSheet = (styleOption: StyleSheetOption) =>
  CustomStyleSheet.create(
    {
      screenView: {
        height: 150,
        width: 150,
        backgroundColor: 'red',
        backgroundColorDark: 'green'
      }
    },
    { ...styleOption, onlyTheme: true }
  );

const mediaQueryStyleSheet = (styleOption: StyleSheetOption) =>
  CustomStyleSheet.create(
    {
      screenView: {
        height: 150,
        width: 150,
        backgroundColor: 'red',
        backgroundColorDark: 'green'
      },
      '@media (orientation: portrait)': {
        screenView: {
          backgroundColor: 'red',
          backgroundColorDark: 'green'
        }
      },
      '@media (orientation: landscape)': {
        screenView: {
          backgroundColor: 'green',
          backgroundColorDark: 'red'
        }
      }
    },
    { ...styleOption, onlyScale: true }
  );

export const ThemeScreen = () => {
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
