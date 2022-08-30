// @ts-nocheck

import { AppProps } from 'next/app';
import Script from 'next/script';
import '../assets/styles/normalize.css';
import { global } from '../assets/themes/themes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ScrollToTop } from '../components/shared/scoll-to-top';
import CookieConsent from '../components/shared/consent';
import { getCookie } from 'cookies-next';

const App = ({ Component, pageProps }: AppProps) => {
  const consent = getCookie('acceptCookies');
  const theme = createTheme(global(createTheme()));
  
  return (
    <ThemeProvider theme={theme}>
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });

            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAGS_MANAGER}');
          `,
        }}
      />
      {consent && (
        <Script
          id="consupd"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            gtag('consent', 'update', {
              'ad_storage': 'granted',
              'analytics_storage': 'granted'
            });
          `,
          }}
        />
      )}
      <CssBaseline />
      <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAGS_MANAGER}`}
        height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
      <Component {...pageProps} />
      <ScrollToTop />
      <CookieConsent />
    </ThemeProvider>
  );
};

export default App;