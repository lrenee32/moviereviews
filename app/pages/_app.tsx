import { AppProps } from 'next/app';
import '../assets/styles/normalize.css';
import { global } from '../assets/themes/themes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ScrollToTop } from 'components/shared/scoll-to-top';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
  const theme = createTheme(global(createTheme()));
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default App;