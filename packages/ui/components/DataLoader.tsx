import { isString } from 'lodash-es';
import { ElementType, forwardRef, ReactElement, ReactNode, Ref } from 'react';

import { Box, BoxProps } from './Box';
import { CircularProgress, CircularProgressProps } from './CircularProgress';
import { Typography } from './Typography';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong';
const DEFAULT_LOADING_SIZE = 48;

export type DataLoaderProps<C extends ElementType, T = unknown> = BoxProps & {
  data: T | undefined;
  isLoading?: boolean;
  LoadingProps?: CircularProgressProps;
  error?: boolean | string;
  fallback?: ReactNode;
  render: (props: DataLoaderRenderProps<C, T>) => ReactNode;
} & BoxProps<C, { component?: C }>;

type DataLoaderRenderProps<C extends ElementType, T = any> = Required<Pick<DataLoaderProps<C, T>, 'data'>>;

type DataLoaderRenderFunction = <C extends ElementType, D = unknown>(
  props: DataLoaderProps<C, D>,
  ref?: Ref<HTMLDivElement>,
) => ReactElement;

const DataLoaderRender: DataLoaderRenderFunction = (props, ref) => {
  const { sx, data, fallback = DEFAULT_ERROR_MESSAGE, isLoading, LoadingProps, error, render, ...restProps } = props;
  const hasData = !(data === null || typeof data === 'undefined');
  const hasError = !!error;
  const fallbackToRender = isString(fallback) ? (
    <Typography variant="body2" sx={{ p: 1 }}>
      {fallback}
    </Typography>
  ) : (
    fallback
  );
  const componentToRender = hasData && !hasError ? render({ data } as DataLoaderRenderProps<'div'>) : fallbackToRender;

  return (
    <Box ref={ref} sx={{ position: 'relative', ...sx }} {...restProps}>
      {isLoading ? (
        <>
          <Box sx={{ minHeight: '200px' }} />
          <CircularProgress
            size={LoadingProps?.size ?? DEFAULT_LOADING_SIZE}
            {...LoadingProps}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: `-${DEFAULT_LOADING_SIZE / 2}px`,
              marginLeft: `-${DEFAULT_LOADING_SIZE / 2}px`,
              ...LoadingProps?.sx,
            }}
          />
        </>
      ) : (
        componentToRender
      )}
    </Box>
  );
};

export const DataLoader = forwardRef(DataLoaderRender) as DataLoaderRenderFunction;
