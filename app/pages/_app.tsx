import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import '../assets/styles/normalize.css';
import { global } from '../assets/themes/themes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ScrollToTop } from 'components/shared/scoll-to-top';
import { pageview } from '../lib/ga';

const App = ({ Component, pageProps }: AppProps) => {
  const theme = createTheme(global(createTheme()));

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router.events]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default App;