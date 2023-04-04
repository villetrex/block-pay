import * as React from 'react';
import { FC } from 'react';
import ScrollToTop from 'react-scroll-to-top';

import { Icon, useTheme } from '@villetrex/ui';

type Props = {
  distance: number;
};

export const UpFab: FC<Props> = ({ distance }) => {
  const theme = useTheme();
  return (
    <ScrollToTop
      style={{
        zIndex: 10000,
        background: theme.palette.success.main,
        boxShadow: theme.shadows[5],
        borderRadius: 64,
        color: theme.palette.common.white,
      }}
      smooth
      top={distance}
      component={<Icon color="inherit">arrow_upward</Icon>}
    />
  );
};
