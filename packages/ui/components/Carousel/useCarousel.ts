import Glide from '@glidejs/glide';
import { Children, useEffect, useState } from 'react';

import { CarouselProps, UseCarouselResult } from './types';

type UseCarouselProps = CarouselProps;

export const useCarousel = ({
  gap = 0,
  focusAt = 0,
  startAt = 0,
  breakpoints,
  autoplay,
  children,
}: UseCarouselProps): UseCarouselResult => {
  const [currentSlide, setCurrentSlide] = useState(startAt);
  const [containerClassName, setContainerClassName] = useState('');
  const slidesCount = Children.count(children);

  useEffect(() => {
    setContainerClassName(`Carousel-${(Math.random() * 10000000).toFixed()}`);
  }, []);

  useEffect(() => {
    if (!containerClassName) {
      return;
    }

    const glide = new Glide(`.${containerClassName}`, {
      type: 'carousel',
      gap,
      focusAt,
      startAt,
      autoplay,
      breakpoints,
    });
    const instance = glide.mount();

    glide.on('move.after', () => {
      setCurrentSlide(instance.index);
    });

    return () => instance.destroy();
  }, [autoplay, containerClassName, focusAt, gap, startAt, breakpoints]);

  return { containerClassName, currentSlide, slidesCount };
};
