import type { FC, ReactNode } from 'react';

import { useMediaQuery } from './Hooks';
import type { MediaQueryAllQueryable } from './Types';

type MediaQueryProps = MediaQueryAllQueryable & {
  children?: ReactNode | Function;
  query?: string;
  device: Partial<MediaQueryAllQueryable>;
  onChange?: (_matches: boolean) => void;
};

const MediaQuery: FC<MediaQueryProps> = ({ children, device, onChange, ...settings }) => {
  const matches: boolean = useMediaQuery(settings, device, onChange);

  if (typeof children === 'function') {
    return children(matches);
  }
  return matches ? children : undefined;
};

export default MediaQuery;
