import React from 'react';
import { View } from 'react-native';
import { CustomStyleSheet, ThemeType, useMyTheme } from 'rn-custom-style-sheet';

const styleSheet = (themeType: ThemeType) =>
  CustomStyleSheet.createScaledTheme(
    {
      screenView: {
        height: '50@vs',
        width: '50@vs',
        backgroundColor: 'red',
        backgroundColorDark: 'green'
      }
    },
    themeType
  );

export const ScaledThemeScreen = () => {
  const styles = useMyTheme(styleSheet);
  return <View style={styles.screenView} />;
};
