import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ElementType, forwardRef, ReactElement, Ref } from 'react';

import { Button, ButtonProps } from './Button';

export type ButtonLinkProps<C extends ElementType = 'div'> = Omit<ButtonProps<C, { component?: C }>, 'href'> &
  NextLinkProps;

type ButtonLinkRenderFunction = <C extends ElementType>(
  props: ButtonLinkProps<C>,
  ref?: Ref<HTMLButtonElement>,
) => ReactElement;

const ButtonLinkRender: ButtonLinkRenderFunction = (
  { children, href, as, replace, scroll, shallow, prefetch, locale, ...props },
  ref,
) => (
  <NextLink
    href={href}
    as={as}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
    prefetch={prefetch}
    locale={locale}
    passHref
    legacyBehavior
  >
    <Button ref={ref} {...props}>
      {children}
    </Button>
  </NextLink>
);

export const ButtonLink = forwardRef(ButtonLinkRender) as ButtonLinkRenderFunction;
