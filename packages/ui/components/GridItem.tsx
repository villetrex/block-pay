import Grid, { GridProps } from '@mui/material/Grid';
import { ElementType, forwardRef, ReactElement, Ref } from 'react';

export type GridItemProps<C extends ElementType = 'div'> = GridProps<C, { component?: C }>;

type GridItemRenderFunction = <C extends ElementType>(
  props: GridItemProps<C>,
  ref?: Ref<HTMLDivElement>,
) => ReactElement;

const GridItemRender: GridItemRenderFunction = ({ children, ...props }, ref) => {
  return (
    <Grid {...props} ref={ref} item>
      {children}
    </Grid>
  );
};

export const GridItem = forwardRef(GridItemRender) as GridItemRenderFunction;
