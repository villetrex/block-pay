import clsx from 'clsx';

import { Box } from '../Box';

export type CarouselDotProps = {
  index: number;
  active: boolean;
};

export const CarouselDot = ({ active, index }: CarouselDotProps) => (
  <Box
    className={clsx('glide__bullet', 'Carousel-dot', active && 'Carousel-dotActive')}
    sx={theme => ({
      width: theme.spacing(1),
      height: theme.spacing(1),
      borderRadius: '50%',
      backgroundColor: 'primary.main',
      opacity: 0.15,
      margin: 0.5,
      '&.Carousel-dotActive': {
        opacity: 1,
        backgroundColor: 'primary.dark',
      },
    })}
    data-glide-dir={`=${index}`}
  />
);
