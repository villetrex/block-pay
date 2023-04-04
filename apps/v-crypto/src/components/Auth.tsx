import { useSession } from 'next-auth/react';
import { FC, PropsWithChildren } from 'react';

export const Auth: FC<PropsWithChildren> = ({ children }) => {
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  });

  if (status === 'loading') {
    return <>'Loading or not authenticated...'</>;
  }

  return <>{children}</>;
};
