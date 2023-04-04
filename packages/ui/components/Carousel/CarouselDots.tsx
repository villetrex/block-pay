import clsx from 'clsx';

import { CarouselDot } from './CarouselDot';
import { UseCarouselResult } from './types';
import { Box } from '../Box';

export type CarouselDotsProps = Pick<UseCarouselResult, 'slidesCount' | 'currentSlide'>;

export const CarouselDots = ({ currentSlide, slidesCount }: CarouselDotsProps) => (
  <Box
    className={clsx('glide__bullets', 'Carousel-dots')}
    sx={{
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      mt: 2.5,
      textAlign: 'center',
    }}
    data-glide-el="controls[nav]"
  >
    {Array.from(new Array(slidesCount)).map((_, index) => (
      <CarouselDot key={index} active={currentSlide === index} index={index} />
    ))}
  </Box>
);
