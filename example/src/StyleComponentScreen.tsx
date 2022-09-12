import React from 'react';
import { Text, TextStyle } from 'react-native';
import { MediaQueryAllQueryable, styleComp, ThemeType, useDevice } from 'rn-custom-style-sheet';

const BigTitleWithProps = styleComp(Text)<TextStyle>(({ props, theme }: { props: TextStyle; theme: ThemeType }) => ({
  padding: props.padding,
  fontWeight: 'bold',
  fontSize: '14@ms',
  color: 'black',
  colorDark: 'cyan',
  '@media (orientation: portrait)': {
    color: 'red',
    colorDark: 'green'
  },
  '@media (orientation: landscape)': {
    color: 'green',
    colorDark: 'red'
  }
}));

const BigTitle = styleComp(Text)({
  fontWeight: 'bold',
  fontSize: 14,
  color: 'black',
  '@media (orientation: portrait)': {
    color: 'red'
  },
  '@media (orientation: landscape)': {
    color: 'green'
  }
});

export const StyleComponentScreen = () => {
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  return (
    <>
      <BigTitle device={device} onlyScale>
        Big Title
      </BigTitle>
      <BigTitleWithProps device={device} padding="20@s">
        Big Title with props
      </BigTitleWithProps>
    </>
  );
};
