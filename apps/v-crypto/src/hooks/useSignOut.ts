import { signOut } from 'next-auth/react';
import { useQueryClient } from 'react-query';
import Cookies from 'universal-cookie';

import { fantasyKeys, predictorKeys } from 'src/providers/react-query-provider';

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return {
    signOut: () => {
      new Cookies().remove('locale', { path: '/' });
      queryClient.removeQueries(predictorKeys.all());
      queryClient.removeQueries(fantasyKeys.all());
      window.MobileNative?.setUserId('');
      signOut({ redirect: false });
    },
  };
};
// const data = await signOut({redirect: false, callbackUrl: "/foo"})
// useRouter().push(data.url)
