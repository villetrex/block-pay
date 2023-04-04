import type { NextPage } from 'next';
import Head from 'next/head';

import Login from 'src/components/Login';

const SignInScreen: NextPage = () => {
  return (
    <>
      <Head>
        <title>v-crypto</title>
        <meta name="description" content="Accept crypto payments" />
        <meta name="keywords" content="crypto payments" />
      </Head>
      <Login />
    </>
  );
};

export default SignInScreen;
