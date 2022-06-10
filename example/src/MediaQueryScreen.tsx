import React from 'react';
import { Text } from 'react-native';
import { useMediaQuery, useDevice, MediaQueryAllQueryable, MediaQuery } from 'rn-custom-style-sheet';

const Desktop = ({ children }: { children: React.ReactElement }) => {
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  const isDesktop = useMediaQuery({ minWidth: 1224 }, device);
  return isDesktop ? children : null;
};

const useTabletAndBelowMediaQuery = () => {
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  return useMediaQuery({ query: '@media (max-width: 1279px)' }, device);
};

const TabletAndBelow = ({ children }: { children: React.ReactElement }) => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery();
  return isTabletAndBelow ? children : null;
};

export const MediaQueryScreen = () => {
  const device: Partial<MediaQueryAllQueryable> = useDevice();
  const isBigScreen = useMediaQuery({ upBreakpoint: '2xl' }, device);
  const isTabletOrMobile = useMediaQuery({ query: '@media (max-width: 1224px)' }, device);
  const isPortrait = useMediaQuery({ query: '@media (orientation: portrait)' }, { ...device, deviceWidth: 1600 });
  const handleMediaQueryChange = (matches: boolean) => {
    // matches will be true or false based on the value for the media query
    console.log({ matches });
  };
  return (
    <>
      {
        <Desktop>
          <Text>You are a desktop or laptop</Text>
        </Desktop>
      }
      {isBigScreen && <Text>You have a huge screen</Text>}
      {isTabletOrMobile && <Text>You are a tablet or mobile phone</Text>}
      <Text>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</Text>
      <MediaQuery device={device} upBreakpoint="md" onChange={handleMediaQueryChange}>
        {/* You can also use a function (render prop) as a child */}
        {(matches: boolean) =>
          matches ? <Text>You are minimum small device</Text> : <Text>You are not minimum small device</Text>
        }
      </MediaQuery>
      <TabletAndBelow>
        <Text>Tablet and below</Text>
      </TabletAndBelow>
    </>
  );
};
