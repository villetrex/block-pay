import { Box, ButtonLink, Grid } from '@villetrex/ui';
import { ArrowForwardRounded } from '@villetrex/ui/icons';
import React, { FC, memo } from 'react';

import { useScreenSize } from 'src/hooks/useScreenSize';

import LoginCarouselSection from './LoginCarouselSection';
import LoginForm from './LoginForm';

import './cast';

const Login: FC = () => {
  const { isMobile } = useScreenSize();

  return (
    <Grid container>
      <Grid item xs sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', p: 2 }}>
        <LoginForm />
      </Grid>
      <Grid item xs={5} sx={{ display: isMobile && 'none', bgcolor: 'background.paper', height: '100vh', p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonLink
            href={''}
            color="secondary"
            variant="contained"
            startIcon={<ArrowForwardRounded fontSize="small" />}
          >
            Sign up
          </ButtonLink>
        </Box>
        <LoginCarouselSection />
      </Grid>
    </Grid>
  );
};

export default memo(Login);
