import type { NextPage } from 'next';
import Head from 'next/head';
import { signIn } from 'next-auth/react';

import Login from 'src/components/Login';

const MyContestsPage: NextPage = () => {
  const handleLogin = async () => {
    const data = await signIn('credentials', {
      username: 'villetrex@gmail.com',
      password: '12345',
      redirect: false,
    });
    if (data?.error) {
      throw new Error(data.error);
    }
    return data;
  };
  return (
    <>
      <Head>
        <title>v-crypto</title>
        <meta name="description" content="Accept crypto payments" />
        <meta name="keywords" content="crypto payments" />
      </Head>
      {/* <button onClick={handleLogin}>login</button> */}
      <Login />
    </>
  );
};

export default MyContestsPage;
