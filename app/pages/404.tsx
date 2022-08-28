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
