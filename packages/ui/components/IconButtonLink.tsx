import { IconButton, IconButtonProps } from '@villetrex/ui';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

export type IconButtonLinkProps = Omit<IconButtonProps, 'href'> & NextLinkProps;

export const IconButtonLink = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  ...props
}: IconButtonLinkProps) => {
  return (
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
      <IconButton {...props}>{children}</IconButton>
    </NextLink>
  );
};
