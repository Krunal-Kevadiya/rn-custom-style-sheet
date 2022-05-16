import React from 'react';
import { View } from 'react-native';
import { CustomStyleSheet } from 'rn-custom-style-sheet';

const styles = CustomStyleSheet.createScaled({
  screenView: {
    height: '50@vs',
    width: '50@vs',
    backgroundColor: 'red'
  }
});

export const ScaledScreen = () => {
  return <View style={styles.screenView} />;
};
