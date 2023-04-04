import { Box, Card, CardContent, CardMedia, Carousel, CarouselItem, Stack, Typography } from '@villetrex/ui';
import Image from 'next/image';
import React, { FC } from 'react';

import { LoginCarouselMock } from 'src/mocks';

const LoginCarouselSection: FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box maxWidth="500px" sx={{ pt: 13, width: 450 }}>
        <Carousel
          gap={0}
          autoplay={4000}
          sx={{
            position: 'relative',
            '& .Carousel-track': { flex: 1 },
            '& .Carousel-slides': { display: 'flex', alignItems: 'flex-start' },
            '& .Carousel-slide': {
              display: 'flex',
              justifyContent: 'center',
            },
            '& .Carousel-dots': {
              // padding: 1,
            },
            '& .Carousel-dot': {
              width: 14,
              height: 14,
              borderRadius: '100%',
              backgroundColor: 'primary.main',
              opacity: 0.3,
              // margin: 0.8,
              mt: 0,
            },
            '& .Carousel-dotActive': {
              opacity: 1,
              backgroundColor: 'primary.main',
            },
          }}
          dots
        >
          {LoginCarouselMock.map((mock, index) => (
            <CarouselItem key={`loginCarousel_${index}`}>
              <Stack
                direction="column"
                gap={1}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 4, py: 2 }}
              >
                <Image src={mock.image} height="250" width="250" alt="login image" />
                <Typography variant="h4" sx={{ textAlign: 'center' }}>
                  {mock.title}
                </Typography>
                <Typography variant="h5" sx={{ textAlign: 'center', color: 'info.dark' }}>
                  {mock.subTitle}
                </Typography>
              </Stack>
            </CarouselItem>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default LoginCarouselSection;
