import clsx from 'clsx';
import { FunctionComponent } from 'react';

import { CarouselDots } from './CarouselDots';
import { CarouselProps } from './types';
import { useCarousel } from './useCarousel';
import { Box } from '../Box';

import '@glidejs/glide/dist/css/glide.core.css';

export const Carousel: FunctionComponent<Partial<CarouselProps>> = props => {
  const { className, children, sx, dots = false } = props;
  const { containerClassName, slidesCount, currentSlide } = useCarousel(props);

  return (
    <Box className={clsx(containerClassName, className)} sx={sx}>
      <Box className={clsx('glide__track', 'Carousel-track')} data-glide-el="track">
        <Box className={clsx('glide__slides', 'Carousel-slides')}>{children}</Box>
      </Box>
      {dots && <CarouselDots slidesCount={slidesCount} currentSlide={currentSlide} />}
    </Box>
  );
};
