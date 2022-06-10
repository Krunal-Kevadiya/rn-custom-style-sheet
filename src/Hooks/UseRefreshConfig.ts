import useThemeContext from './UseThemeContext';

export default function useRefreshConfig(): boolean {
  const {
    state: { isRefreshConfig }
  } = useThemeContext();
  return isRefreshConfig;
}
