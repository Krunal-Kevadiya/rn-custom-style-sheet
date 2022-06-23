import PropTypes from 'prop-types';

const PREFIX: string = '@media';

const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

// media types
const types = {
  all: PropTypes.bool,
  screen: PropTypes.bool,
  tv: PropTypes.bool,
  ios: PropTypes.bool,
  android: PropTypes.bool,
  windows: PropTypes.bool,
  macos: PropTypes.bool,
  web: PropTypes.bool
};

// properties that match media queries
const matchers = {
  aspectRatio: stringOrNumber,
  deviceAspectRatio: stringOrNumber,

  height: stringOrNumber,
  deviceHeight: stringOrNumber,

  width: stringOrNumber,
  deviceWidth: stringOrNumber,

  type: Object.keys(types),
  direction: PropTypes.oneOf(['rtl', 'ltr']),
  orientation: PropTypes.oneOf(['portrait', 'landscape'])
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { type, ...featureMatchers } = matchers;

// media features
const features = {
  minAspectRatio: PropTypes.string,
  maxAspectRatio: PropTypes.string,
  minDeviceAspectRatio: PropTypes.string,
  maxDeviceAspectRatio: PropTypes.string,

  minHeight: stringOrNumber,
  maxHeight: stringOrNumber,
  minDeviceHeight: stringOrNumber,
  maxDeviceHeight: stringOrNumber,

  minWidth: stringOrNumber,
  maxWidth: stringOrNumber,
  minDeviceWidth: stringOrNumber,
  maxDeviceWidth: stringOrNumber,

  upBreakpoint: stringOrNumber,
  downBreakpoint: stringOrNumber,
  betweenBreakpoint: PropTypes.array,
  onlyBreakpoint: stringOrNumber,
  notBreakpoint: stringOrNumber,

  ...featureMatchers
};

const all = { ...types, ...features };

export default {
  all: all,
  types: types,
  matchers: matchers,
  features: features,
  PREFIX
};
