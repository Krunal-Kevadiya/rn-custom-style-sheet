import { useMediaQuery } from '../../Hooks';
import type { MediaQueryPropsType } from './MediaQueryComponentTypes';

const MediaQuery = ({
  children,
  device,
  onChange,
  ...settings
}: MediaQueryPropsType): React.ReactElement | null => {
  const matches: boolean = useMediaQuery(settings, device, onChange);

  if (typeof children === 'function') {
    return children(matches);
  }
  return matches ? children : null;
};

export default MediaQuery;
