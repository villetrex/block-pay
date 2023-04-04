import Grid, { GridProps } from '@mui/material/Grid';
import React, { ElementType, forwardRef, ReactElement, Ref } from 'react';

// https://github.com/mui/material-ui/issues/15827#issuecomment-809209533

export type GridContainerProps<C extends ElementType = 'div'> = GridProps<C, { component?: C }>;

type GridContainerRenderFunction = <C extends ElementType>(
  props: GridContainerProps<C>,
  ref?: Ref<HTMLDivElement>,
) => ReactElement;

const GridContainerRender: GridContainerRenderFunction = ({ children, ...props }, ref) => (
  <Grid {...props} ref={ref} container>
    {children}
  </Grid>
);

export const GridContainer = forwardRef(GridContainerRender) as GridContainerRenderFunction;
