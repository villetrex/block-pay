import { Head, Html, Main, NextScript } from "next/document";

import theme from "src/providers/mui/theme";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.cdnfonts.com/css/gobold" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
