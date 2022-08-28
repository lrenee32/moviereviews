import { FunctionComponent } from 'react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Nav } from 'components';
import { Footer } from 'components/shared/nav/footer';
import { ReadOnly } from 'components/shared/wysiwyg/ReadOnly';
import containerStyles from 'assets/styles/content-section.module.scss';
import termsStyles from 'assets/styles/terms.module.scss';
import body from 'utils/terms.json';
import { Descendant } from 'slate';

const Terms: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>Splatter & Scream - Terms of Use</title>
        <meta property="og:url" content="https://splatterandscream.com/terms" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Splatter & Scream - Terms of Use" />
        <meta
          property="og:description"
          content="News, reviews and videos on the latest and greatest horror media. Horror media reviews by horror fans."
        />
        <meta property="og:image" content="https://splatterandscream.com/images/site-logo-main.png" />
      </Head>
      <Box className={containerStyles['wrapper']}>
        <Container maxWidth="lg" className={containerStyles['container']}>
          <Nav style="large" />
          <Typography variant="h2" className={termsStyles['header']} id="back-to-top-anchor">Terms of Use</Typography>
          <ReadOnly value={body as Descendant[]} />
          <Footer />
        </Container>
      </Box>
    </>
  );
};

export default Terms;
