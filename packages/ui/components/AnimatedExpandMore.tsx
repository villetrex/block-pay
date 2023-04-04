import { IconButton, IconButtonProps } from './IconButton';
import { styled } from '../theme/styled';

type AnimatedExpandMoreProps = {
  expand: boolean;
} & IconButtonProps;

export const AnimatedExpandMore = styled((props: AnimatedExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
