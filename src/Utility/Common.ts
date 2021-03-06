import {
  heightPercentageToDP,
  moderateScale,
  moderateVerticalScale,
  scale,
  sdp,
  ssp,
  verticalScale,
  viewportHeight,
  viewportMax,
  viewportMin,
  viewportWidth,
  widthPercentageToDP
} from './Matrics';

// Groups   Size   Func    Factor  SkipAspectRatio Round
//           1      2        3           4           5
const validScaleSheetRegex = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /^(\-?\d+(?:\.\d{1,3})?)@(mv?s(\d+(?:\.\d{1,2})?)?|s|vs|wp|hp|vh|vw|vmin|vmax|sdp|ssp)(sar)?(r)?$/i
);

export function scaleFunc(value: string): number | string | undefined {
  if (!validScaleSheetRegex.test(value)) {
    return value;
  }

  const regexExecResult: RegExpExecArray | null = validScaleSheetRegex.exec(value);
  const size = parseFloat(regexExecResult?.[1] ?? '0'); // get the size of the component
  let scaleFuncName = regexExecResult?.[2]?.toLowerCase() ?? ''; // get the scale function
  const scaleFactor = regexExecResult?.[3]; // get the scale factor for font or it's string or undefined values
  const skipAspectRatio = regexExecResult?.[4]?.toLowerCase() === 'sar'; // skip the aspect ratio or not
  const shouldRound = regexExecResult?.[5]?.toLowerCase() === 'r'; // should result is round or not

  if (scaleFactor) scaleFuncName = scaleFuncName.slice(0, -scaleFactor.length); // Remove the factor from it

  let result;

  switch (scaleFuncName) {
    case 's':
      result = scale(size, skipAspectRatio);
      break;
    case 'vs':
      result = verticalScale(size, skipAspectRatio);
      break;
    case 'ms':
      result = moderateScale(size, skipAspectRatio, parseFloat(scaleFactor ?? '0.5'));
      break;
    case 'mvs':
      result = moderateVerticalScale(size, skipAspectRatio, parseFloat(scaleFactor ?? '0.5'));
      break;
    case 'hp':
      result = heightPercentageToDP(size);
      break;
    case 'wp':
      result = widthPercentageToDP(size);
      break;
    case 'vmin':
      result = viewportMin(size, skipAspectRatio);
      break;
    case 'vmax':
      result = viewportMax(size, skipAspectRatio);
      break;
    case 'vh':
      result = viewportHeight(size, skipAspectRatio);
      break;
    case 'vw':
      result = viewportWidth(size, skipAspectRatio);
      break;
    case 'sdp':
      result = sdp(size, skipAspectRatio);
      break;
    case 'ssp':
      result = ssp(size, skipAspectRatio);
      break;
    default:
  }

  return shouldRound ? Math.round(result ?? 0) : result;
}

export function shallowEqualArrays(arrA: any | unknown[], arrB: any | unknown[]) {
  if (arrA === arrB) {
    return true;
  }

  if (!arrA || !arrB) {
    return false;
  }

  var len = arrA.length;

  if (arrB.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }

  return true;
}

export function shallowEqualObjects(objA: any | unknown, objB: any | unknown) {
  if (objA === objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  var aKeys = Object.keys(objA);
  var bKeys = Object.keys(objB);
  var len = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    var key = aKeys[i];

    if (objA[key] !== objB[key] || !Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }
  }

  return true;
}
