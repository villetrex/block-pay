import { cloneElement, FC, isValidElement, PropsWithChildren } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = PropsWithChildren<{
  onChange: (inView: boolean) => void;
}>;

export const VisibilityTracker: FC<Props> = ({ onChange, children }) => {
  const { ref } = useInView({
    fallbackInView: true,
    onChange,
  });

  if (!isValidElement(children)) {
    return <>{children}</>;
  }

  return cloneElement(children, { ...children.props, ref });
};
