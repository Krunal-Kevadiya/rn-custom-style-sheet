import React from 'react';
import { Text, View } from 'react-native';
import {
  type MediaQueryAllQueryable,
  styled,
  useDevice,
  type CustomStyledComponentProps,
} from 'rn-custom-style-sheet';
import Colors from './ThemeColors';

const ScreenView = styled(View)(
  ({ styleOption }): CustomStyledComponentProps => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors[styleOption.themeMode]?.srnBackgroundColor,
  })
);

const BigTitleWithProps = styled(Text)(
  ({ styleOption, ...props }): CustomStyledComponentProps => ({
    'flex': 1,
    'padding': props.padding,
    'fontWeight': 'bold',
    'fontSize': '14@mhs',
    '@media (orientation: portrait)': {
      color: Colors[styleOption.themeMode]?.darkPink,
    },
    '@media (orientation: landscape)': {
      color: Colors[styleOption.themeMode]?.lightPink,
    },
  })
);

const BigTitle = styled.Text({
  'fontWeight': 'bold',
  'fontSize': 14,
  '@media (orientation: portrait)': {
    color: Colors.light?.lightPink,
  },
  '@media (orientation: landscape)': {
    color: Colors.light?.darkPink,
  },
});

export const StyleComponentScreen = () => {
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  return (
    <ScreenView>
      <BigTitle device={device}>Big Title</BigTitle>
      <BigTitleWithProps device={device} padding="40@hs">
        Big Title with props
      </BigTitleWithProps>
    </ScreenView>
  );
};
