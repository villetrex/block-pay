import { useMediaQuery } from '@villetrex/ui';

import theme from 'src/providers/mui/theme';

export const useScreenSize = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return {
    isMobile,
    isDesktop,
  };
};
