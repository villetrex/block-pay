import { Options } from '@glidejs/glide';
import { ReactNode } from 'react';

import { SxProps } from '../../styles';

export type CarouselProps = Pick<Options, 'gap' | 'focusAt' | 'startAt' | 'autoplay' | 'breakpoints'> & {
  className?: string;
  sx?: SxProps;
  dots?: boolean;
  children?: ReactNode;
};

export type UseCarouselResult = {
  currentSlide: number;
  slidesCount: number;
  containerClassName: string;
};
