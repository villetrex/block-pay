import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { Box } from '../Box';

export type CarouselItemProps = PropsWithChildren<{ className?: string }>;

export const CarouselItem = ({ className, children }: CarouselItemProps) => (
  <Box className={clsx('glide__slide', 'Carousel-slide', className)}>{children}</Box>
);
