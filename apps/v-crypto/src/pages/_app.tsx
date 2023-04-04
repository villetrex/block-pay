import { Backdrop, CircularProgress, CssBaseline, ThemeProvider } from '@villetrex/ui';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { FC, useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { Auth } from 'src/components/Auth';
import { GraphqlQueryProvider } from 'src/providers/apollo-client-provider';
import theme from 'src/providers/mui/theme';
import { ReactQueryProvider } from 'src/providers/react-query-provider';
import store from 'src/providers/store';
import { AuthEnabledComponentConfig } from 'src/types';

function App({
  Component,
  pageProps: { session, ...pageProps },
}: Omit<AppProps, 'Componenet'> & {
  Component: FC & Partial<AuthEnabledComponentConfig>;
}) {
  const { events, locale } = useRouter();
  const [isPageTransiting, setIsPageTransiting] = useState<boolean>(false);
  useEffect(() => {
    const handleStart = () => setIsPageTransiting(true);
    const handleComplete = () => setIsPageTransiting(false);

    events.on('routeChangeStart', handleStart);
    events.on('routeChangeComplete', handleComplete);
    events.on('routeChangeError', handleComplete);

    return () => {
      events.off('routeChangeStart', handleStart);
      events.off('routeChangeComplete', handleComplete);
      events.off('routeChangeError', handleComplete);
    };
  }, [events, locale]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GraphqlQueryProvider>
        <ReactQueryProvider>
          <SessionProvider session={session} refetchInterval={5 * 60} refetchOnWindowFocus={false}>
            <Provider store={store}>
              {Boolean(Component.auth) ? (
                <Auth>
                  <Component {...pageProps} />
                </Auth>
              ) : (
                <Component {...pageProps} />
              )}
            </Provider>
          </SessionProvider>
          <Backdrop
            sx={{
              color: 'primary.contrastText',
              zIndex: theme => theme.zIndex.drawer + 1,
            }}
            open={isPageTransiting}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </ReactQueryProvider>
      </GraphqlQueryProvider>
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
