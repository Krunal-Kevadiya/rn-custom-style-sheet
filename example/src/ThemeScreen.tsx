import React from 'react';
import { View } from 'react-native';
import { CustomStyleSheet, ThemeType, useMyTheme } from 'rn-custom-style-sheet';

const styleSheet = (themeType: ThemeType) =>
  CustomStyleSheet.createTheme(
    {
      screenView: {
        height: 150,
        width: 150,
        backgroundColor: 'red',
        backgroundColorDark: 'green'
      }
    },
    themeType
  );

export const ThemeScreen = () => {
  const styles = useMyTheme(styleSheet);
  return <View style={styles.screenView} />;
};
