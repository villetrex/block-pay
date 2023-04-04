import Glide, { Options } from '@glidejs/glide';
import { Controls } from '@glidejs/glide/dist/glide.modular.esm';
import { SxProps } from '@mui/system';
import clsx from 'clsx';
import { FC, PropsWithChildren, useEffect } from 'react';

import { CarouselDots } from './CarouselDots';
import { Box } from '../Box';
import '@glidejs/glide/dist/css/glide.core.css';

export const Carousel: FC<
  PropsWithChildren & Partial<Options & { Controls: any; sx: SxProps; displayRibbons: boolean }>
> = ({ autoplay = 2000, type = 'carousel', displayRibbons, sx, children, ...props }) => {
  useEffect(() => {
    const glide = new Glide('.glide', {
      Controls,
      type,
      autoplay,
      ...props,
    });
    const instance = glide.mount();

    return () => instance.destroy();
  }, [autoplay, props, type]);

  return (
    <Box className={clsx('glide')} sx={sx}>
      <Box className={clsx('glide__track', 'Carousel-track')} data-glide-el="track">
        <Box className={clsx('glide__slides', 'Carousel-slides')}>{children}</Box>
      </Box>
      {displayRibbons && <CarouselDots slidesCount={slidesCount} currentSlide={currentSlide} />}
    </Box>
  );
};

// export const Carousel: FunctionComponent<CarouselProps> = props => {
//   const { className, children, sx, dots = false } = props;
//   const { containerClassName, slidesCount, currentSlide } = useCarousel(props);

// };
