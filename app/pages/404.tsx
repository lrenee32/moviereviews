import { FunctionComponent } from 'react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Nav } from 'components';
import { Footer } from 'components/shared/nav/footer';
import containerStyles from 'assets/styles/content-section.module.scss';
import errorStyles from 'assets/styles/404.module.scss';

const Custom404: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>Page Not Found - Splatter & Scream</title>
        <meta name="description" content="News, reviews and videos on the latest and greatest horror media. Horror media reviews by horror fans." />
        <meta name="robots" content="noindex, follow" />

        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Splatter & Scream" />
        <meta property="og:title" content="Splatter & Scream - Page Not Found" />
        <meta
          property="og:description"
          content="News, reviews and videos on the latest and greatest horror media. Horror media reviews by horror fans."
        />
        <meta property="og:image" content="https://splatterandscream.com/images/site-meta-main.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Splatter & Scream - Page Not Found" />
        <meta name="twitter:description" content="News, reviews and videos on the latest and greatest horror media. Horror media reviews by horror fans." />
        <meta name="twitter:image" content="https://splatterandscream.com/images/site-meta-main.png" />
        <meta name="twitter:site" content="@splatternscream" />
      </Head>
      <Box className={containerStyles['wrapper']}>
        <Container maxWidth="lg" className={containerStyles['container']}>
          <Nav style="large" />
          <Box className={errorStyles['error-container']}>
            <Typography variant="h1">Page not found</Typography>
            <Typography>The page you requested does not exist or has moved.</Typography>
          </Box>
          <Footer />
        </Container>
      </Box>
    </>
  );
};

export default Custom404;
