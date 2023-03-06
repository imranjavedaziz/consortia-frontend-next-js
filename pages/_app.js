import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import Layout from "../src/layout/Index";
import NftsLayout from "../src/nftsLayout";
import { AuthContext } from "../src/context/AuthContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const renderWithLayout =
    Component.getLayout ||
    function (page) {
      return <Layout>{page}</Layout>;
    };

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="description"
          content="Consortia is the only NFT and training solution led by an SEC registered investment banker, real estate broker and mortgage loan originator."
        ></meta>
        <link rel="shortcut icon" href="/consortiaFavicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/graphik" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <AuthContext>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {/* <Layout> */}
          {renderWithLayout(<Component {...pageProps} />)}
          {/* </Layout> */}
        </AuthContext>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
