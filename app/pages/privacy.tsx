import { FunctionComponent } from 'react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Nav } from 'components';
import { Footer } from 'components/shared/nav/footer';
import { ReadOnly } from 'components/shared/wysiwyg/ReadOnly';
import containerStyles from 'assets/styles/content-section.module.scss';
import privacyStyles from 'assets/styles/privacy.module.scss';
import body from 'utils/privacy-policy.json';
import { Descendant } from 'slate';

const Privacy: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>Splatter & Scream - Privacy Policy</title>
        <meta name="description" content="News, reviews and videos on the latest and greatest horror media. Horror media reviews by horror fans." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://splatterandscream.com/privacy" />

        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://splatterandscream.com/privacy" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Splatter & Scream - Privacy Policy" />
        <meta
          property="og:description"
          content="News, reviews and videos on the latest and greatest horror media. Horror media reviews by horror fans."
        />
        <meta property="og:image" content="https://splatterandscream.com/images/site-logo-main.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://splatterandscream.com/privacy" />
        <meta name="twitter:title" content="Splatter & Scream - Privacy Policy" />
        <meta name="twitter:description" content="News, reviews and videos on the latest and greatest horror media. Horror media reviews by horror fans." />
        <meta name="twitter:image" content="https://splatterandscream.com/images/site-logo-main.png" />
        <meta name="twitter:site" content="@splatternscream" />
      </Head>
      <Box className={containerStyles['wrapper']}>
        <Container maxWidth="lg" className={containerStyles['container']}>
          <Nav style="large" />
          <Typography variant="h2" className={privacyStyles['header']} id="back-to-top-anchor">Privacy Policy</Typography>
          <ReadOnly value={body as Descendant[]} />
          <Footer />
        </Container>
      </Box>
    </>
  );
};

export default Privacy;
