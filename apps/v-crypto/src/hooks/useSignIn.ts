import { signIn } from 'next-auth/react';
import { useMutation } from 'react-query';
import Cookies from 'universal-cookie';

type Options = {
  email: string;
  password: string;
  onSuccess?: () => void;
  onError?: (data?: any) => void;
};

export const useSignIn = () => {
  return useMutation(
    'signIn',
    async ({ email, password }: Options) =>
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      }),
    {
      retry: false,
      onSuccess: () => {
        new Cookies().set('locale', 'en-ng', {
          path: '/',
        });
      },
    },
  );
};
