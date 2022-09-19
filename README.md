# rn-custom-style-sheet

Create responsive design with the help of custom style sheet

#### Steps to Run & Build:

- Install dependencies `yarn`
- Build `yarn build`
- Install dependencies in example app `cd example && yarn && cd ios/ && pod install && cd ..`
- Run example app `yarn ios`

- Run `yarn build` to sync package changes / updates

## Installation

---

npm

```bash
npm install rn-custom-style-sheet react-native-mmkv
```

Yarn

```bash
yarn add install rn-custom-style-sheet react-native-mmkv
```

### Size with custom units

| Unit                         | Description                                                                                                  | Example                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `<size>@s<sar><r>`           | scales `size` in a linear manner relative to screen width                                                    | `5.5@s`                |
| `<size>@vs<sar><r>`          | scales `size` in a linear manner relative to screen height                                                   | `7@vs`                 |
| `<size>@ms<factor><sar><r>`  | scales `size` in a linear manner relative to screen width. `factor` is resize factor. Default is `0.5`       | `5@ms` or `5@ms0.25`   |
| `<size>@mvs<factor><sar><r>` | scales `size` in a linear manner relative to screen height. `factor` is resize factor. Default is `0.5`      | `5@mvs` or `5@mvs0.75` |
| `<size>@hp<sar><r>`          | size percentage relative to the window height                                                                | `1@hp`                 |
| `<size>@wp<sar><r>`          | size percentage to the window width                                                                          | `1@wp`                 |
| `<size>@vw<sar><r>`          | size relative to the window width                                                                            | `1.02@vw`              |
| `<size>@vh<sar><r>`          | size relative to the window height                                                                           | `10@vh`                |
| `<size>@vmin<sar><r>`        | size relative to the shortest dimension compared between window width and height                             | `10@vmin`              |
| `<size>@vmax<sar><r>`        | size relative to the largest dimension compared between window width and height                              | `10@vmax`              |
| `<size>@sdp<sar><r>`         | size relative to the window width, More detail of [sdp](https://github.com/intuit/sdp)                       | `10@sdp`               |
| `<size>@ssp<sar><r>`         | size relative to the window width and device font size , More detail of [ssp](https://github.com/intuit/ssp) | `10@ssp`               |

**Note:**

- `size` : can be any positive number (including decimal) for `s`, `vs`, `ms`, `mvs`, `sdp` and `ssp`
- `size` : can be any positive percentage (including decimal) for `hp`, and `wp`
- `size` : can be any positive number ranging from 0 to 100 (including decimal) for `vw`, `vh`, `vmin`, and `vmax`
- `factor` : can be any positive number ranging from 0 and 1 (including decimal)
- `sar` : can be skip aspect ratio apply to given `size`
- `r` : can be rounding the result

### Forcing a device with the `device` prop

---

- At times you may need to render components with different device settings than what gets automatically detected.
- This is especially useful in a Node environment where these settings can't be detected (SSR) or for testing.

  #### **Possible Keys**

  `orientation`, `aspectRatio`, `deviceAspectRatio`, `height`, `deviceHeight`, `width`, `deviceWidth`, `direction`, `prefersColorScheme` and `type`

  #### **Possible Types**

  `modifier` can be one of: `only` or `not`

  `type` can be one of: `all`, `screen`, `tv`, `ios`, `android`, `windows`, `macos` or `web`

  `aspectRatio` or `deviceAspectRatio` : to decimal number

  `height`, `width`, `deviceHeight`, or `deviceWidth` : to `em`, `rem`, `cm`, `mm`, `in`, `pt`, `pc` and `px`

  `direction` can be one of: `rtl` or `ltr`

  `prefersColorScheme` can be one of: `light` ro `dark`

### Supplying through Context / ThemeProvider

---

#### **Default breakpoints**

Each breakpoint (a key) matches with a fixed screen width (a value):

- base, base / extra-small: 0px
- sm, small: 480px
- md, medium: 768px
- lg, large: 992px
- xl, extra-large: 1280px
- 2xl, double-extra-large: 1536px

These values can be customized using `guideLineBreakpointValues` key.

- This is a theme provider and applies to the app level js/ts.
- `isThemeSupportedOrientation` : props will be support device landscape mode from scaling because when device orientation change then change height and width(Default false).
- `isAppLandscape` props will be support device landscape mode from scaling because when application need landscape mode then change height and width(Default false).
- `isMediaQuerySupportedOrientation` : props will be support device landscape mode from media query because when device orientation change then change height, width and orientation(Default true).
- `deviceForMediaQuery` : props will be used to apply media query device configuration at project level.
- `guideLineBaseWidth` : can be default guideline width sizes are based on standard ~5" screen mobile device or you can set based on design guideline. Default to `375`
- `guideLineBaseHeight` : can be default guideline height sizes are based on standard ~5" screen mobile device or you can set based on design guideline. Default to `812`
- `guideLineBreakpointValues` : The keys are your screen names, and the values are the min-width where that breakpoint should start. Default to the above values.
- `guideLineBreakpointUnit` : The unit used for the breakpoint's values. Default is `px` but can be changed, can be one of `em`, `rem`, `cm`, `mm`, `in`, `pt`, `pc` and `px`
- `guideLineBreakpointStep` : The increment divided by 100 used to implement exclusive breakpoints. For example, `step = 5` means that `down(500)` will result in `(max-width: 499.95px)`. Default to `0`
- `isUsedBuiltInAspectRatioFunction`: Default is `false`. Set true if you want to apply aspect ration function which are provided built-in.
- `guideLineAspectRatioFunction` : can be function which calculates new size based on aspect ratio condition.
- `getStorageString` : can be function which get current theme mode in local storage.
- `setStorageString` : can be function which storage current theme mode in local storage.

```js
const App = () => {
  return (
    <ThemeProvider deviceForMediaQuery={{ width: 500 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};
```

## API

---

### 01. `create (styles, option)`

A function which returns computed styles on the basis of media queries specified, scale functionality or theming.

Here styles is plain json object to define your component or screen all styles

#### Arguments

- `styles` (_object_) : A style object either the normal or with custom properties and media queries.
- `styles` (_object_,_option_) : A option is contain `theme`, `device`, `onlyTheme` and `onlyScale` key properties.

  - `theme` : A theme is theme type which is currently used like `light` or `dark`
  - `device` : At times you may need to render components with different device settings than what gets automatically detected.

    This is especially useful in a Node environment where these settings can't be detected (SSR) or for testing.

    For Device type check **Forcing a device with the `device` prop** section above

  - `onlyTheme` : Define true when only support dark or light theme mode(Exclude scale functionality).
  - `onlyScale` : Define true when only support scale functionality(Exclude dark or light theme mode support)
    Note: The `onlyTheme` and `onlyScale` property always applies visa versa.

#### Return

- `customStyleSheet` (_object_,_option_)
  - `styles` (_object_,_option_): A style object which is generated during application start. See basic [example](#Example) below.

### 02. getCurrentTheme

Will return current theme, based on app and system theme which are provided as a parameter.

`Example :` getCurrentTheme('system', 'system')

### 03. scale

Will return a linear scaled result of the provided size, based on your device's screen width

`Example :` scale(10)

### 04. verticalScale

Will return a linear scaled result of the provided size, based on your device's screen height.

`Example :` verticalScale(10)

### 05. moderateScale

Sometimes you don't want to scale everything in a linear manner, that's where moderateScale comes in.

The cool thing about it is that you can control the resize factor (default is 0.5).

If normal scale will increase your size by +2X, moderateScale will only increase it by +X, for example:

- scale(10) = 20
- moderateScale(10) = 15
- moderateScale(10, 0.1) = 11

### 06. moderateVerticalScale

Same as moderateScale, but using verticalScale instead of scale.

`Example :` moderateVerticalScale(10)

### 07. heightPercentageToDP

Their names essentially mean that you can supply a "percentage like" string value and it will return the DP (indipendent pixel) that correspond to the supplied percentage of current screen's height.

`Example :` widthPercentageToDP('50%')

### 08. widthPercentageToDP

Their names essentially mean that you can supply a "percentage like" string value and it will return the DP (indipendent pixel) that correspond to the supplied percentage of current screen's width.

`Example :` widthPercentageToDP('50%')

### 09. viewportHeight

Size relative to the window height

`Example :` viewportHeight(1.02)

### 10. viewportWidth

Size relative to the window width

`Example :` viewportWidth(10)

### 11. viewportMax

Size relative to the largest dimension compared between window width and height

`Example :` viewportMax(10)

### 12. viewportMin

Size relative to the shortest dimension compared between window width and height

`Example :` viewportMin(10)

### 13. sdp

New size unit - sdp (scalable dp). This size unit scales with the screen size. It can help developers with supporting multiple screens.
More detail of [sdp](https://github.com/intuit/sdp)

`Example :` sdp(10)

### 14. ssp

New size unit - ssp (scalable sp). This size unit scales with the screen size based on the sp size unit (for texts). It can help developers with supporting multiple screens.
More detail of [ssp](https://github.com/intuit/ssp)

`Example :` ssp(10)

### 15. windowHeight

here is provided windows height.

### 16. windowWidth

here is provided windows width.

## Hooks

### 01. useCurrentOrientation

If you want to get the current orientation from theme but based on `isThemeSupportedOrientation` props setting.

If `isThemeSupportedOrientation` true than provided `portrait` or `landscape` otherwise provided `portrait`

```js
const orientation: OrientationType = useCurrentOrientation();
```

### 02. useCurrentTheme

if you want to get the current theme than used this hook, hook will return `dark` or `light` mode

```js
const theme: ThemeType = useCurrentTheme();
```

### 03. useTheme

Custom hook for applying the current theme in our style object.

```js
const normalStyleSheet = (styleOption: StyleSheetOption) =>
  CustomStyleSheet.create <
  Styles >
  ({
    screenView: {
      height: '50@vs',
      width: '50@vs',
      backgroundColor: 'red'
    }
  },
  { ...styleOption, onlyScale: true });

const { styles } = useTheme(normalStyleSheet);
```

### 04. useThemeContext

Hook provided a theme provider context.

### 05. useUpdateTheme

Custom hook for update the current app theme or switch theme in our application(used for setting preference or other you have specify option in our application).

```js
const handleAppTheme = useUpdateTheme();

<Button onPress={() => handleAppTheme('dark')}>
	Dark Theme
</Button>

<Button onPress={() => handleAppTheme('light')}>
	Light Theme
</Button>
```

### 06. useDevice

This hook provided device configuration value based on own config props or `deviceForMediaQuery` props from provider or default value.

```jsx
const device: Partial<MediaQueryAllQueryable> = useDevice();
```

OR

```jsx
const device: Partial<MediaQueryAllQueryable> = useDevice({
  width: window.width,
  height: window.height,
  orientation: window.width > window.height ? 'landscape' : 'portrait',
  aspectRatio: window.width / window.height,
  type: Platform.isTV ? 'tv' : Platform.OS,
  direction: isRTL ? 'rtl' : 'ltr',
  prefersColorScheme: Appearance.getColorScheme() || 'light'
});
```

### 07. useMediaQuery

```jsx
const Example = () => {
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  const isDesktopOrLaptop: boolean = useMediaQuery({
    query: '@media (min-width: 1224px)'
  });
  const isBigScreen: boolean = useMediaQuery({ query: '@media (min-width: 1824px)' }, device);
  const isTabletOrMobile: boolean = useMediaQuery({ query: '@media (max-width: 1224px)' }, device);
  const isPortrait: boolean = useMediaQuery({ query: '@media (orientation: portrait)' }, { ...device, width: 1600 });

  return (
    <>
      <Text>Device Test!</Text>
      {isDesktopOrLaptop && <Text>You are a desktop or laptop</Text>}
      {isBigScreen && <Text>You have a huge screen</Text>}
      {isTabletOrMobile && <Text>You are a tablet or mobile phone</Text>}
      <Text>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</Text>
      <MediaQuery device={device} upBreakpoint="xs" onChange={handleMediaQueryChange}>
        {/* You can also use a function (render prop) as a child */}
        {(matches: boolean) =>
          matches ? <Text>You are minimum small device</Text> : <Text>You are not minimum small device</Text>
        }
    </>
  );
};
```

### With Components

```jsx
const Example = () => (
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  <>
    <Text>Device Testing!</Text>
    <MediaQuery minWidth={1224}>
      <Text>You are a desktop or laptop</Text>
      <MediaQuery minWidth={1824}>
        <Text>You also have a huge screen</Text>
      </MediaQuery>
    </MediaQuery>
  </>
);
```

To make things more idiomatic to react, you can use camel-cased shorthands to construct media queries.

For a list of all possible shorthands and value types see https://github.com/Krunal-Kevadiya/rn-custom-style-sheet/tree/main/src/MediaQuery/MediaQuery.ts#L9.

Any numbers given as shorthand will be expanded to px (1234 will become '1234px').

The CSS media queries in the example above could be constructed like this:

```jsx
const Example = () => {
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  const isDesktopOrLaptop: boolean = useMediaQuery({ minWidth: 1224 }, device);
  const isBigScreen: boolean = useMediaQuery({ minWidth: 1824 }, device);
  const isTabletOrMobile: boolean = useMediaQuery({ maxWidth: 1224 }, device);
  const isPortrait: boolean = useMediaQuery({ orientation: 'portrait' }, device);

  return (
    <>
      <Text>Device Test!</Text>
      {isDesktopOrLaptop && <Text>You are a desktop or laptop</Text>}
      {isBigScreen && <Text>You have a huge screen</Text>}
      {isTabletOrMobile && <Text>You are a tablet or mobile phone</Text>}
      <Text>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</Text>
    </>
  );
};
```

### `onChange`

You can use the `onChange` callback to specify a change handler that will be called when the media query's value changes.

```jsx
const Example = () => {
  const handleMediaQueryChange = (matches: boolean) => {
    // matches will be true or false based on the value for the media query
  };
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  const isDesktopOrLaptop: boolean = useMediaQuery({ minWidth: 1224 }, device, handleMediaQueryChange);

  return <Text>...</Text>;
};
```

```jsx
const Example = () => {
  const handleMediaQueryChange = (matches: boolean) => {
    // matches will be true or false based on the value for the media query
  };
  const device: Partial<MediaQueryAllQueryable> = useDevice();

  return (
    <MediaQuery device={device} minWidth={1224} onChange={handleMediaQueryChange}>
      ...
    </MediaQuery>
  );
};
```

## Easy Mode

That's it! Now you can create your application specific breakpoints and reuse them easily. Here is an example:

```jsx
const Desktop = ({ children }) => {
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  const isDesktop = useMediaQuery({ minWidth: 992 }, device);
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 }, device);
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  const isMobile = useMediaQuery({ maxWidth: 767 }, device);
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  const isNotMobile = useMediaQuery({ minWidth: 768 }, device);
  return isNotMobile ? children : null;
};

const Example = () => (
  <>
    <Desktop>
      <Text>Desktop or laptop</Text>
    </Desktop>
    <Tablet>
      <Text>Tablet</Text>
    </Tablet>
    <Mobile>
      <Text>Mobile</Text>
    </Mobile>
    <Default>
      <Text>Not mobile (desktop or laptop or tablet)</Text>
    </Default>
  </>
);
```

And if you want a combo (the DRY way):

```js
const useDesktopMediaQuery = () => {
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  return useMediaQuery({ query: '@media (min-width: 1280px)' }, device);
};

const useTabletAndBelowMediaQuery = () => {
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  return useMediaQuery({ query: '@media (max-width: 1279px)' }, device);
};

const Desktop = ({ children }) => {
  const isDesktop = useDesktopMediaQuery();

  return isDesktop ? children : null;
};

const TabletAndBelow = ({ children }) => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery();

  return isTabletAndBelow ? children : null;
};
```

## Breakpoint

key (string | number): A breakpoint key (xs, sm, etc.) or a screen width number in px or your provided breakpoint unit(`guideLineBreakpointUnit` props to provider).

1. Up (upBreakpoint / up-breakpoint)

   Which matches screen widths greater than the screen size given by the breakpoint key (inclusive).

   `Example :` upBreakpoint: 'sm' / (up-breakpoint: sm)

2. Down (downBreakpoint / down-breakpoint)

   Which matches screen widths less than the screen size given by the breakpoint key (exclusive).

   `Example :` downBreakpoint: 'md' / (down-breakpoint: md)

3. Between (betweenBreakpoint / between-breakpoint)

   Which matches screen widths greater than the screen size given by the breakpoint key in the first argument (inclusive) and less than the screen size given by the breakpoint key in the second argument (exclusive).

   `Example :` betweenBreakpoint: ['sm', 'lg'] / (between-breakpoint: [sm, lg])

4. Only (onlyBreakpoint / only-breakpoint)

   Which matches screen widths starting from the screen size given by the breakpoint key (inclusive) and stopping at the screen size given by the next breakpoint key (exclusive).

   `Example :` onlyBreakpoint: 'md' / (only-breakpoint: md)

5. Not (notBreakpoint / not-breakpoint)

   Which matches screen widths stopping at the screen size given by the breakpoint key (exclusive) and starting at the screen size given by the next breakpoint key (inclusive).

   `Example :` notBreakpoint: '2xl' / (not-breakpoint: 2xl)

## Style Component

If do you want to used style as style components then

A function which returns computed styles on the basis of scale functionality, media queries specified or theming.

`Syntax :` `styleComp(Component)<ComponentPropsType>(({ props }) => ({}))`

```js
const BigTitleWithProps =
  styleComp(Text) <
  TextStyle >
  (({ props, theme }: { props: TextStyle, theme: ThemeType }) => ({
    padding: props.padding,
    fontWeight: 'bold',
    fontSize: '14@ms',
    color: 'black',
    colorDark: 'white',
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

const Example = () => {
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
```

## Global way to handle theme mode

If do you want to thing handle theme mode own way using Color object instead of above uses then,

1. First create colors object like below

```js
const commonColors = {
  primary: '#141414',
  secondary: '#F1C336',
  gray: '#7B7B7B',
  error: '#E53E3E',
  pink: '#BA25EB',
  orange: '#F39C3C',
  lightBlue: '#3787FC',
  red: '#DD2C2C',
  darkBlue: '#374dfc',
  transparent: 'transparent'
};

const light = {
  ...commonColors,
  white: '#FFFFFF',
  black: '#000000',
  transparentBlack: '#00000000',
  transparentWhite: '#FFFFFF00'
};

const dark = {
  ...commonColors,
  black: '#FFFFFF',
  white: '#000000',
  transparentWhite: '#00000000',
  transparentBlack: '#FFFFFF00'
};

export default { light, dark };
```

2. Create styles like below

```js
const normalStyleSheet = (styleOption: StyleSheetOption) =>
  CustomStyleSheet.create <
  Styles >
  ({
    screenView: {
      height: '50@vs',
      width: '50@vs',
      backgroundColor: Colors[styleOption.theme]?.white
    }
  },
  { ...styleOption, onlyScale: true });

const { styles } = useTheme(normalStyleSheet);
```

3. If you can used style component then like below

```js
const BigTitleWithProps =
  styleComp(Text) <
  TextStyle >
  (({ props, theme }: { props: TextStyle, theme: ThemeType }) => ({
    padding: props.padding,
    fontWeight: 'bold',
    fontSize: '14@ms',
    color: Colors[theme]?.white,
    '@media (orientation: portrait)': {
      color: Colors[theme]?.white
    },
    '@media (orientation: landscape)': {
      color: Colors[theme]?.black
    }
  }));
```

## Example

- Check out repository in example folder

## Acknowledgments and Big Thanks to

[react-responsive](https://github.com/contra/react-responsive)

## Roadmap (What to do in next)

- Support for React-Native-Web.

## License

This project is licensed under the MIT License - see the [MIT](LICENSE) file for details
