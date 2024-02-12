const commonColors = {
  lightPink: '#CA45F6',
  darkPink: '#A016CE',
  lightOrange: '#F7A752',
  darkOrange: '#FF8000',
  lightRed: '#FA3868',
  darkRed: '#C71010',
  lightBlue: '#3787FC',
  darkBlue: '#374dfc',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

const light = {
  ...commonColors,
  srnBackgroundColor: commonColors.white,
  txtColor: commonColors.white,
  btnBackgroundColor: commonColors.darkBlue,
  btnShadowColor: commonColors.darkPink,
};

const dark = {
  ...commonColors,
  srnBackgroundColor: commonColors.black,
  txtColor: commonColors.black,
  btnBackgroundColor: commonColors.lightBlue,
  btnShadowColor: commonColors.lightPink,
};

export default { light, dark };

const summerLight = {
  ...commonColors,
  srnBackgroundColor: commonColors.lightOrange,
  txtColor: commonColors.white,
  btnBackgroundColor: commonColors.darkBlue,
  btnShadowColor: commonColors.darkPink,
};

const summerDark = {
  ...commonColors,
  srnBackgroundColor: commonColors.darkOrange,
  txtColor: commonColors.black,
  btnBackgroundColor: commonColors.lightBlue,
  btnShadowColor: commonColors.lightPink,
};
const summer = { light: summerLight, dark: summerDark };
const winterLight = {
  ...commonColors,
  srnBackgroundColor: commonColors.lightRed,
  txtColor: commonColors.white,
  btnBackgroundColor: commonColors.darkOrange,
  btnShadowColor: commonColors.darkPink,
};

const winterDark = {
  ...commonColors,
  srnBackgroundColor: commonColors.darkRed,
  txtColor: commonColors.black,
  btnBackgroundColor: commonColors.lightOrange,
  btnShadowColor: commonColors.lightPink,
};
const winter = { light: winterLight, dark: winterDark };
const monsoonLight = {
  ...commonColors,
  srnBackgroundColor: commonColors.lightBlue,
  txtColor: commonColors.white,
  btnBackgroundColor: commonColors.darkRed,
  btnShadowColor: commonColors.darkPink,
};

const monsoonDark = {
  ...commonColors,
  srnBackgroundColor: commonColors.darkBlue,
  txtColor: commonColors.black,
  btnBackgroundColor: commonColors.lightRed,
  btnShadowColor: commonColors.lightPink,
};
const monsoon = { light: monsoonLight, dark: monsoonDark };

export const MultiTheme: Record<string, typeof monsoon> = {
  summer,
  winter,
  monsoon,
};
